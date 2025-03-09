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
    <div className="mt-5 text-lg">
      <p>
        <strong>Face Shape:</strong> <span>{faceShape}</span>
      </p>
      <p>
        <strong>Face Length:</strong> <span>{faceLength}</span>
      </p>
      <p>
        <strong>Face Width:</strong> <span>{faceWidth}</span>
      </p>
      <p>
        <strong>Jawline Width:</strong> <span>{jawlineWidth}</span>
      </p>
    </div>
  );
};

export default Results;
