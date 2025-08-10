import React, { useEffect, useState } from "react";
import { getWeatherData } from "./utils/azureClient";

import AlertsBanner from "./components/AlertsBanner";
import LatestReadingCard from "./components/LatestReadingCard";
import TemperatureChart from "./components/TemperatureChart";
import DataTable from "./components/Datatable";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWeatherData().then(raw => {
      const normalized = raw.map(d => ({
        timestamp: d.Timestamp || d.timestamp,
        temperature: d.Temperature || d.temperature,
        description: d.Description || d.description,
      }));
      setData(normalized);
    });
  }, []);

  const latest = data[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-blue-800 drop-shadow-md">
          🌤 Weather Dashboard
        </h1>

        {/* Alert */}
        {latest && <AlertsBanner latest={latest} />}

        {/* Latest Reading */}
        {latest && (
          <div className="flex justify-center">
            <LatestReadingCard latest={latest} />
          </div>
        )}

        {/* Temperature Chart */}
        {data.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">📈 Temperature Trend</h2>
            <TemperatureChart data={data.slice(0, 10)} />
          </div>
        )}

        {/* Data Table */}
        {data.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">🗃 Recent Weather Records</h2>
            <DataTable entries={data.slice(0, 20)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
