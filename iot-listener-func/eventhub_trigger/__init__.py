import logging
import azure.functions as func
import json
from azure.data.tables import TableServiceClient
import uuid
import datetime
import os
from azure.data.tables import TableServiceClient

# Prefer a dedicated var; fall back to Azure Functions' default if present
conn_str = os.getenv("AZURE_STORAGE_CONNECTION_STRING") or os.getenv("AzureWebJobsStorage")

if not conn_str:
    raise RuntimeError(
        "Missing Azure Storage connection string. "
        "Set AZURE_STORAGE_CONNECTION_STRING (or AzureWebJobsStorage for Functions)."
    )

table_service = TableServiceClient.from_connection_string(conn_str)
table_client = table_service.get_table_client(table_name="WeatherData")

try:
    table_client.create_table()
except:
    pass  # Ignore if already exists

def main(event: func.EventHubEvent):
    try:
        data = json.loads(event.get_body().decode('utf-8'))
        entity = {
            'PartitionKey': 'Weather',
            'RowKey': str(uuid.uuid4()),
            'Temperature': data.get('temperature'),
            'Description': data.get('description'),
            'Timestamp': datetime.datetime.utcnow().isoformat()
        }
        logging.info(f"✅ Storing to Table: {entity}")
        table_client.create_entity(entity=entity)
    except Exception as e:
        logging.error(f"❌ Error storing data: {e}")
