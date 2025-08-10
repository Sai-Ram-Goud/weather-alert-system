import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function WeatherChart({ data }) {
  const chartData = {
    labels: data.map(d => new Date(d.Timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Temperature (°C)',
      data: data.map(d => d.Temperature),
      borderColor: 'blue',
      tension: 0.4
    }]
  };
  return (
    <div>
      <h3>Temperature Trend</h3>
      <Line data={chartData} />
    </div>
  );
}
