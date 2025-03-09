// src/App.tsx
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Results from "./components/Results";
import ProgressBars from "./components/ProgressBars";

const App: React.FC = () => {
  const [faceShape, setFaceShape] = useState<string>("-");
  const [faceLength, setFaceLength] = useState<string>("-");
  const [faceWidth, setFaceWidth] = useState<string>("-");
  const [jawlineWidth, setJawlineWidth] = useState<string>("-");
  const [probabilities, setProbabilities] = useState<{ [key: string]: number }>(
    {}
  );
  const [error, setError] = useState<string | null>(null); // Add error state

  return (
    <div className="text-center p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">Face Shape Detector</h1>
      {error && <p className="text-red-500 mb-5">{error}</p>}{" "}
      {/* Display error message */}
      <FileUpload
        setFaceShape={setFaceShape}
        setFaceLength={setFaceLength}
        setFaceWidth={setFaceWidth}
        setJawlineWidth={setJawlineWidth}
        setProbabilities={setProbabilities}
        setError={setError} // Pass setError to FileUpload
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

export default App;
