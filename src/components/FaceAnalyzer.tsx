//src/components/FaceAnalyzer.tsx
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Results from "./Results";
import ProgressBars from "./ProgressBars";

const FaceAnalyzer: React.FC = () => {
  const [faceShape, setFaceShape] = useState<string>("-");
  const [faceLength, setFaceLength] = useState<string>("-");
  const [faceWidth, setFaceWidth] = useState<string>("-");
  const [jawlineWidth, setJawlineWidth] = useState<string>("-");
  const [probabilities, setProbabilities] = useState<{ [key: string]: number }>(
    {}
  );
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="text-center">
      {error && <p className="text-red-500 mb-5">{error}</p>}
      <FileUpload
        setFaceShape={setFaceShape}
        setFaceLength={setFaceLength}
        setFaceWidth={setFaceWidth}
        setJawlineWidth={setJawlineWidth}
        setProbabilities={setProbabilities}
        setError={setError}
      />
      <Results
        faceShape={faceShape}
        faceLength={faceLength}
        faceWidth={faceWidth}
        jawlineWidth={jawlineWidth}
      />
      <ProgressBars probabilities={probabilities} />
    </div>
  );
};

export default FaceAnalyzer;
