// components/TemperatureChart.jsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function TemperatureChart({ data }) {
  const chartData = {
    labels: data.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(entry => entry.temperature),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      },
    ],
  };

  return (
    <div className="mt-6">
      <Line data={chartData} />
    </div>
  );
}
