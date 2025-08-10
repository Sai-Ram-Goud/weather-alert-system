import time
import random
from azure.iot.device import IoTHubDeviceClient, Message


CONNECTION_STRING = "HostName=weather-iothub.azure-devices.net;DeviceId=weather-sensor;SharedAccessKey=qQY9a3mjEaKm21Wr3gGVFxtXBM7RtFf8u+fahs+tTDY="

device_client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

while True:
    temperature = round(random.uniform(10, 40), 2)
    description = random.choice([
        "clear sky", "broken clouds", "light rain",
        "heavy intensity rain", "storm"
    ])

    message = Message(f'{{"temperature": {temperature}, "description": "{description}"}}')
    print("📤 Sending message:", message)
    device_client.send_message(message)
    time.sleep(10)  # Wait 10 seconds before sending next message
