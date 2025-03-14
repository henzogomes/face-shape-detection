//src/components/FaceAnalyzer.tsx
import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Results from "./Results";
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
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleMeasurements = () => {
    setShowMeasurements(!showMeasurements);
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-5 text-center">{error}</p>}

      <div className="flex flex-col md:flex-row gap-1">
        {/* Left Column - File Upload */}
        <div className="w-full md:w-2/3 p-4">
          <FileUpload
            setFaceShape={setFaceShape}
            setFaceLength={setFaceLength}
            setFaceWidth={setFaceWidth}
            setJawlineWidth={setJawlineWidth}
            setProbabilities={setProbabilities}
            setError={setError}
            showMeasurements={showMeasurements}
            setIsProcessing={setIsProcessing}
          />
        </div>

        {/* Right Column - Results */}
        <div className="w-full md:w-3/6 p-4">
          <Results
            faceShape={faceShape}
            faceLength={faceLength}
            faceWidth={faceWidth}
            jawlineWidth={jawlineWidth}
            probabilities={probabilities}
            isProcessing={isProcessing}
            showMeasurements={showMeasurements}
            toggleMeasurements={toggleMeasurements}
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
