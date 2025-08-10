// components/DataTable.jsx
export default function DataTable({ entries }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border rounded shadow-md text-sm">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="p-2">Time</th>
            <th className="p-2">Temp (°C)</th>
            <th className="p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="p-2">{new Date(e.timestamp).toLocaleString()}</td>
              <td className="p-2">{e.temperature}</td>
              <td className="p-2">{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
