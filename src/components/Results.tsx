// src/components/Results.tsx
import React from "react";

interface ResultsProps {
  faceShape: string;
  faceLength: string;
  faceWidth: string;
  jawlineWidth: string;
}

const Results: React.FC<ResultsProps> = ({
  faceShape,
  faceLength,
  faceWidth,
  jawlineWidth,
}) => {
  return (
    <div className="mt-5 text-left">
      <h2 className="text-xl font-bold mb-4">Your Face Analysis</h2>

      <div className="bg-white p-5 rounded-lg shadow">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-orange-600 mb-2">Face Shape</h3>
          <p className="text-2xl font-bold uppercase">{faceShape}</p>
        </div>

        <h3 className="text-lg font-bold mb-2">Measurements</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600 text-sm">Face Length</p>
            <p className="font-medium">{faceLength}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Face Width</p>
            <p className="font-medium">{faceWidth}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Jawline Width</p>
            <p className="font-medium">{jawlineWidth}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Ratio (L:W)</p>
            <p className="font-medium">
              {faceLength !== "-" && faceWidth !== "-"
                ? (Number(faceLength) / Number(faceWidth)).toFixed(2)
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
