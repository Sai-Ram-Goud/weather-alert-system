// components/AlertsBanner.jsx
export default function AlertsBanner({ latest }) {
  if (latest.temperature > 38 || latest.description.toLowerCase().includes("storm")) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 text-center">
        ⚠️ Weather Alert: {latest.description}, {latest.temperature}°C
      </div>
    );
  }
  return null;
}
