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
  const [showFaceMesh, setShowFaceMesh] = useState(false);
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

  const toggleFaceMesh = () => {
    setShowFaceMesh(!showFaceMesh);
  };

  return (
    <div className="relative">
      {/* Processing Overlay */}
      {showProcessingOverlay && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-70 dark:bg-black dark:bg-opacity-80 z-50 flex items-center justify-center"
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div
              className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
              aria-hidden="true"
            ></div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Processing your image...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              Please wait while we analyze your face shape
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="text-red-500 dark:text-red-400 mb-5 text-center"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column - File Upload */}
        <section
          className="w-full md:w-2/3 p-4 bg-white dark:bg-gray-800 rounded-lg"
          aria-labelledby="upload-section"
        >
          <h2 id="upload-section" className="sr-only">
            Upload Photo Section
          </h2>
          <FileUpload
            setFaceShape={setFaceShape}
            setFaceLength={setFaceLength}
            setFaceWidth={setFaceWidth}
            setJawlineWidth={setJawlineWidth}
            setProbabilities={setProbabilities}
            setError={setError}
            showMeasurements={showMeasurements}
            showFaceMesh={showFaceMesh}
            setIsProcessing={setIsProcessing}
          />
        </section>

        {/* Right Column - Results */}
        <section
          className="w-full md:w-3/6 p-4 bg-white dark:bg-gray-800 rounded-lg"
          aria-labelledby="results-section"
        >
          <h2 id="results-section" className="sr-only">
            Analysis Results
          </h2>
          <Results
            faceShape={faceShape}
            faceLength={faceLength}
            faceWidth={faceWidth}
            jawlineWidth={jawlineWidth}
            probabilities={probabilities}
            isProcessing={isProcessing}
            showMeasurements={showMeasurements}
            toggleMeasurements={toggleMeasurements}
            showFaceMesh={showFaceMesh}
            toggleFaceMesh={toggleFaceMesh}
          />
        </section>
      </div>

      {/* Face Shape Information Section */}
      <section
        aria-labelledby="shapes-info"
        className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-4"
      >
        <h2 id="shapes-info" className="sr-only">
          Face Shape Information
        </h2>
        <ShapesInfo
          highlightedShape={faceShape !== "-" ? faceShape : undefined}
        />
      </section>
    </div>
  );
};

export default FaceAnalyzer;
