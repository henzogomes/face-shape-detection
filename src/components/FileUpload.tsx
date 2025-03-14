import React, { useRef, useState, useEffect } from "react";
import {
  createFaceMesh,
  processFaceMeshResults,
  reRenderFaceMesh,
  RenderCallbacks,
  FaceMeshResults,
} from "../utils/faceMeshProcessor";
import {
  processUploadedImage,
  displayAndProcessImage,
} from "../utils/imageProcessor";

interface FileUploadProps {
  setFaceShape: React.Dispatch<React.SetStateAction<string>>;
  setFaceLength: React.Dispatch<React.SetStateAction<string>>;
  setFaceWidth: React.Dispatch<React.SetStateAction<string>>;
  setJawlineWidth: React.Dispatch<React.SetStateAction<string>>;
  setProbabilities: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  showMeasurements: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFaceShape,
  setFaceLength,
  setFaceWidth,
  setJawlineWidth,
  setProbabilities,
  setError,
  showMeasurements,
  setIsProcessing,
}) => {
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const faceMeshCanvasRef = useRef<HTMLCanvasElement>(null);
  const extractedColorRef = useRef<string>("#FF0000");
  const [lastResults, setLastResults] = useState<FaceMeshResults | null>(null);

  // Create callbacks object for the rendering function
  const renderCallbacks: RenderCallbacks = {
    setError,
    setProbabilities,
    setFaceLength,
    setFaceWidth,
    setJawlineWidth,
    setFaceShape,
  };

  // Define onResults function
  const onResults = (results: any) => {
    const faceMeshCanvas = faceMeshCanvasRef.current;
    if (!faceMeshCanvas) return;

    // Use the extracted color ref
    const currentColor = extractedColorRef.current;

    // Store latest results with the current extracted color
    setLastResults({
      results,
      currentMeshColor: currentColor,
    });

    // Process and render face mesh
    processFaceMeshResults(
      results,
      faceMeshCanvas,
      currentColor,
      showMeasurements,
      renderCallbacks,
      setIsProcessing
    );
  };

  // Initialize face mesh
  const faceMesh = createFaceMesh(onResults);

  // Re-render when measurements display setting changes
  useEffect(() => {
    reRenderFaceMesh(
      lastResults,
      faceMeshCanvasRef.current,
      showMeasurements,
      renderCallbacks
    );
  }, [showMeasurements, lastResults]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Please select a valid image file.");
      return;
    }

    setIsProcessing(false); // Reset processing state

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const photoCanvas = photoCanvasRef.current;
      const faceMeshCanvas = faceMeshCanvasRef.current;

      if (photoCanvas && faceMeshCanvas) {
        // Process the uploaded image
        const imgProcessResult = processUploadedImage(img);

        // Store the extracted color
        extractedColorRef.current = imgProcessResult.extractedColor;

        // Display and process the image
        displayAndProcessImage(
          imgProcessResult,
          photoCanvas,
          faceMeshCanvas,
          faceMesh
        );
      }
    };
    img.onerror = () => {
      setError("Failed to load the image. Please try again.");
    };
  };

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold mb-5">
        Upload a Photo to Detect Your Face Shape With AI
      </h1>
      <div className="relative flex justify-center">
        <canvas
          ref={photoCanvasRef}
          className={`border border-gray-300 w-3/4 ${
            lastResults ? "" : "hidden"
          }`}
        />
        <canvas
          ref={faceMeshCanvasRef}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none border border-gray-300 w-3/4 ${
            lastResults ? "" : "hidden"
          }`}
        />
      </div>

      <div className="m-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="mb-5"
        />
      </div>
    </div>
  );
};

export default FileUpload;
