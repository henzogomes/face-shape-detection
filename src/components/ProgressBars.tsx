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
      <div className="space-y-4">
        {sortedProbabilities.map(([shape, percentage]) => (
          <div key={shape} className="mb-2">
            {/* Label above the bar */}
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-800 capitalize">
                {shape}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {percentage.toFixed(1)}%
              </span>
            </div>

            {/* Thinner progress bar container */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              {/* Orange progress bar */}
              <div
                className="bg-orange-500 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;
