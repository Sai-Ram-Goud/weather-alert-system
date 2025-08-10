export default function WeatherCard({ latest }) {
  if (!latest) return null;
  return (
    <div>
      <h3>Latest Weather</h3>
      <p><b>Temperature:</b> {latest.Temperature}°C</p>
      <p><b>Description:</b> {latest.Description}</p>
      <p><b>Time:</b> {latest.Timestamp}</p>
    </div>
  );
}
