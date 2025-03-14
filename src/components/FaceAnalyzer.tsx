//src/components/FaceAnalyzer.tsx
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Results from "./Results";
import ProgressBars from "./ProgressBars";
import ShapesInfo from "./ShapesInfo";

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
    <div>
      {error && <p className="text-red-500 mb-5 text-center">{error}</p>}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - File Upload */}
        <div className="w-full md:w-1/2 p-4">
          <FileUpload
            setFaceShape={setFaceShape}
            setFaceLength={setFaceLength}
            setFaceWidth={setFaceWidth}
            setJawlineWidth={setJawlineWidth}
            setProbabilities={setProbabilities}
            setError={setError}
          />
        </div>

        {/* Right Column - Results */}
        <div className="w-full md:w-1/2 p-4">
          <Results
            faceShape={faceShape}
            faceLength={faceLength}
            faceWidth={faceWidth}
            jawlineWidth={jawlineWidth}
            probabilities={probabilities}
          />
        </div>
      </div>

      {/* Face Shape Information Section */}
      <ShapesInfo
        highlightedShape={faceShape !== "-" ? faceShape : undefined}
      />
    </div>
  );
};

export default FaceAnalyzer;
