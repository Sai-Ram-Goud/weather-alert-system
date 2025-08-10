export default function WeatherTable({ data }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Time</th><th>Temperature</th><th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, idx) => (
          <tr key={idx}>
            <td>{new Date(d.Timestamp).toLocaleString()}</td>
            <td>{d.Temperature}</td>
            <td>{d.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
