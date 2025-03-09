// src/components/ProgressBars.tsx
import React from "react";

interface ProgressBarsProps {
  probabilities: { [key: string]: number };
}

const ProgressBars: React.FC<ProgressBarsProps> = ({ probabilities }) => {
  // Sort probabilities in descending order
  const sortedProbabilities = Object.entries(probabilities).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-3">Face Shape Probabilities</h2>
      <div className="space-y-2">
        {sortedProbabilities.map(([shape, percentage]) => (
          <div key={shape} className="bg-gray-200 rounded">
            <div
              className="bg-blue-500 text-white text-sm py-1 px-2 rounded"
              style={{ width: `${percentage}%` }}
            >
              {shape}: {percentage.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;
