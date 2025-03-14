import React, { useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { ColorExtractor } from "../utils/ColorExtractor";
import { renderFaceMeshWithMeasurements } from "../utils/faceMeshRenderer";

interface FileUploadProps {
  setFaceShape: React.Dispatch<React.SetStateAction<string>>;
  setFaceLength: React.Dispatch<React.SetStateAction<string>>;
  setFaceWidth: React.Dispatch<React.SetStateAction<string>>;
  setJawlineWidth: React.Dispatch<React.SetStateAction<string>>;
  setProbabilities: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFaceShape,
  setFaceLength,
  setFaceWidth,
  setJawlineWidth,
  setProbabilities,
  setError,
}) => {
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const faceMeshCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [meshColor, setMeshColor] = useState("#FF0000"); // Default mesh color
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [lastResults, setLastResults] = useState<{
    results: any;
    currentMeshColor: string;
  } | null>(null); // State to store the latest results

  // Add a ref to store the current extracted color
  const extractedColorRef = useRef<string>("#FF0000");

  // Initialize Face Mesh
  const faceMesh = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  // Create callbacks object for the rendering function
  const renderCallbacks = {
    setError,
    setProbabilities,
    setFaceLength,
    setFaceWidth,
    setJawlineWidth,
    setFaceShape,
  };

  // Modify onResults to use the extracted color ref
  const onResults = (results: any) => {
    const faceMeshCanvas = faceMeshCanvasRef.current;
    if (!faceMeshCanvas) return;

    const faceMeshCtx = faceMeshCanvas.getContext("2d");
    if (!faceMeshCtx) return;

    // Use the extracted color ref instead of the state
    const currentColor = extractedColorRef.current;

    // Store latest results with the current extracted color
    setLastResults({
      results,
      currentMeshColor: currentColor,
    });

    // Call the rendering function with the extracted color
    renderFaceMesh(results, faceMeshCanvas, faceMeshCtx, currentColor);
  };

  // Create a separate function to handle rendering
  const renderFaceMesh = (
    results: any,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    colorToUse: string
  ) => {
    // Use the imported rendering function
    renderFaceMeshWithMeasurements(
      results,
      canvas,
      ctx,
      colorToUse,
      showMeasurements,
      renderCallbacks
    );

    // Set processing to complete if we get this far
    setIsProcessing(true);
  };

  faceMesh.onResults(onResults);

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
        photoCanvas.width = img.width;
        photoCanvas.height = img.height;
        faceMeshCanvas.width = img.width;
        faceMeshCanvas.height = img.height;

        const photoCtx = photoCanvas.getContext("2d");
        if (photoCtx) {
          photoCtx.drawImage(img, 0, 0, img.width, img.height);
        }

        // Extract predominant color from the image
        const predominantColor = ColorExtractor.extractPredominantColor(img);
        const newColor = predominantColor.hex;

        // Store the color in both state and ref
        setMeshColor(newColor);
        extractedColorRef.current = newColor;

        // Process the face mesh
        faceMesh.send({ image: img });
      }
    };
    img.onerror = () => {
      setError("Failed to load the image. Please try again.");
    };
  };

  // Modify the toggle button click handler to force redraw with the new value
  const toggleMeasurements = () => {
    const newShowMeasurements = !showMeasurements;
    setShowMeasurements(newShowMeasurements);

    // Force redraw if we have results
    if (lastResults && faceMeshCanvasRef.current) {
      const ctx = faceMeshCanvasRef.current.getContext("2d");
      if (ctx) {
        // Use the imported rendering function directly
        renderFaceMeshWithMeasurements(
          lastResults.results,
          faceMeshCanvasRef.current,
          ctx,
          lastResults.currentMeshColor,
          newShowMeasurements,
          renderCallbacks
        );
      }
    }
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
            isProcessing ? "" : "hidden"
          }`}
        />
        <canvas
          ref={faceMeshCanvasRef}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none border border-gray-300 w-3/4 ${
            isProcessing ? "" : "hidden"
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
      {isProcessing && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={toggleMeasurements}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            {showMeasurements ? "Hide Measurements" : "Show Measurements"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
