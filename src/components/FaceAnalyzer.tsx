//src/components/FaceAnalyzer.tsx
import React, { useState, useEffect, useRef } from "react";
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
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);

  // Refs to track timing
  const startTimeRef = useRef<number>(0);
  const minimumDuration = 3000;

  useEffect(() => {
    if (isProcessing) {
      // Start processing - show overlay and record start time
      startTimeRef.current = Date.now();
      setShowProcessingOverlay(true);
      console.log(`Overlay shown at: ${new Date().toISOString()}`);
    } else if (startTimeRef.current > 0) {
      // Processing completed - check how long it's been visible
      const elapsedTime = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, minimumDuration - elapsedTime);

      // Wait for remaining time if needed before hiding
      setTimeout(() => {
        //const totalDuration = Date.now() - startTimeRef.current;
        //console.log(`Overlay hidden. Total display time: ${totalDuration}ms`);
        setShowProcessingOverlay(false);
        startTimeRef.current = 0;
      }, remainingTime);
    }
  }, [isProcessing]);

  const toggleMeasurements = () => {
    setShowMeasurements(!showMeasurements);
  };

  return (
    <div className="relative">
      {/* Processing Overlay */}
      {showProcessingOverlay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold">Processing your image...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we analyze your face shape
            </p>
          </div>
        </div>
      )}

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
