import datetime
import logging
import os
import requests
import json
from azure.data.tables import TableServiceClient
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('🌤️ Weather HTTP-triggered function started...')

    if req.method not in ["GET", "POST"]:
        return func.HttpResponse("❌ Method not allowed", status_code=405)

    # Load environment variables
    API_KEY = os.getenv("OPENWEATHER_API_KEY")
    AZURE_TABLE_CONN = os.getenv("AZURE_TABLE_CONN")
    LOGIC_APP_URL = os.getenv("LOGIC_APP_URL")

    if not API_KEY or not AZURE_TABLE_CONN or not LOGIC_APP_URL:
        logging.error("❌ Missing one or more environment variables.")
        return func.HttpResponse("Missing environment variables", status_code=500)

    try:
        # Step 1: Fetch weather data
        city = "Dublin,IE"
        weather_api_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        response = requests.get(weather_api_url)

        if response.status_code != 200:
            logging.error(f"❌ Failed to fetch weather: {response.status_code}")
            return func.HttpResponse(f"Weather API error: {response.status_code}", status_code=500)

        data = response.json()
        temperature = data.get("main", {}).get("temp")
        description = data.get("weather", [{}])[0].get("description")
        timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
        row_key = datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")  # for RowKey

        if temperature is None or description is None:
            logging.error("❌ Incomplete weather data.")
            return func.HttpResponse("Incomplete data", status_code=500)

        logging.info(f"🌡️ Temperature: {temperature}°C")
        logging.info(f"🌥️ Description: {description}")

        # Step 2: Store in Azure Table Storage
        table_service = TableServiceClient.from_connection_string(AZURE_TABLE_CONN)
        table_name = "WeatherLogs"

        try:
            table_service.create_table(table_name)
            logging.info("📁 Table created.")
        except Exception:
            logging.info("📁 Table already exists or cannot be created again.")

        table_client = table_service.get_table_client(table_name)
        entity = {
            "PartitionKey": "WeatherData",
            "RowKey": row_key,
            "temperature": temperature,
            "description": description,
            "timestamp": timestamp
        }
        table_client.create_entity(entity)
        logging.info("✅ Weather data stored in Azure Table Storage.")

        # Step 3: Conditional Logic App trigger
        alert_triggered = False
        if temperature > 35 or "rain" in description.lower() or "storm" in description.lower():
            alert_triggered = True
            payload = {
                "temperature": temperature,
                "description": description,
                "timestamp": timestamp
            }
            try:
                logic_response = requests.post(LOGIC_APP_URL, json=payload, timeout=10)
                logging.info(f"📬 Logic App triggered: {logic_response.status_code} {logic_response.text}")
            except Exception as e:
                logging.error(f"❌ Logic App trigger failed: {str(e)}")

        # ✅ Final log before return
        logging.info("✅ Returning final response to Logic App.")

        return func.HttpResponse(
            json.dumps({
                "message": "✅ Weather processed successfully.",
                "temperature": temperature,
                "description": description,
                "timestamp": timestamp,
                "alert_triggered": alert_triggered
            }),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"❌ Exception occurred: {str(e)}")
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)
