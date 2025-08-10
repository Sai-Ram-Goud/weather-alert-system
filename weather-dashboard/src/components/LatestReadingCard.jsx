// components/LatestReadingCard.jsx
import React from 'react';

export default function LatestReadingCard({ latest }) {
  return (
    <div className="rounded-xl shadow-md p-5 bg-white w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2 text-blue-600">Latest Weather Reading</h2>
      <p><strong>Temperature:</strong> {latest.temperature}°C</p>
      <p><strong>Description:</strong> {latest.description}</p>
      <p className="text-gray-500 text-sm"><strong>Time:</strong> {new Date(latest.timestamp).toLocaleString()}</p>
    </div>
  );
}
