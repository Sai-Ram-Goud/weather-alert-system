# weather-alert-system
A weather alert system built with Azure services, including IoT Hub, Azure Functions, Table Storage, and Logic Apps. The system collects, stores, and displays live weather data through a React-based dashboard, with backend processing and alert generation.
# weather-alert-system 🌦️

A weather alert system built with **Azure IoT Hub**, **Azure Functions**, **Table Storage**, and **Logic Apps**.  
It collects, stores, and displays live weather data through a **React** dashboard, with backend processing and alert generation.

---

## 🚀 Features
- Real-time weather data ingestion via Azure IoT Hub
- Automated processing using Azure Functions
- Data storage in Azure Table Storage
- Logic Apps for triggering email/SMS alerts
- React dashboard with:
  - Latest readings card
  - Temperature trend chart
  - Alerts banner
  - Weather data table

---

## 🛠️ Tech Stack
**Frontend**
- React (JavaScript)
- Chart.js for data visualization

**Backend**
- Node.js / Express API
- Azure Functions (Python or Node)
- Azure Table Storage SDK
- Logic Apps for workflows

**Cloud Services**
- Azure IoT Hub
- Azure Table Storage
- Azure Logic Apps
- Azure Functions

---

## 📂 Project Structure
```text
weather-alert-system/
├── weather-dashboard/        # React frontend
├── Backend/                  # Backend server/API
├── iot-listener-func/        # Azure Function for IoT data
├── weatherCheck/             # Additional Azure Function(s)
└── simulator.py              # Simulates IoT weather device


⚙️ Setup
1) Clone the repository

git clone https://github.com/Sai-Ram-Goud/weather-alert-system.git
cd weather-alert-system
2) Frontend

cd weather-dashboard
npm install
npm start
3) Backend

cd Backend
npm install                         # If Node.js backend
# OR
pip install -r requirements.txt     # If Python Azure Functions
4) Environment Variables
Create a .env file in the project root:

env


AZURE_STORAGE_CONNECTION_STRING=your_connection_string_here
5) Run Azure Functions locally (if used)

func start
