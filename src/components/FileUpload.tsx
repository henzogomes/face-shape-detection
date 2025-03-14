import React, { useRef, useState } from "react";
import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { drawConnectors } from "@mediapipe/drawing_utils";
import {
  calculateDistance,
  calculateConfidenceScores,
  normalizeScores,
} from "../utils/faceShapeUtils";
import { ColorExtractor } from "../utils/ColorExtractor";

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

  // Function to add 50% transparency to a hex color
  const getTransparentColor = (hex: string): string => {
    // Convert hex to RGBA with 50% transparency
    return `${hex}99`;
  };

  // Function to draw measurement lines on the face
  const drawMeasurementLines = (
    ctx: CanvasRenderingContext2D,
    foreheadCenter: { x: number; y: number },
    chinPoint: { x: number; y: number },
    leftCheek: { x: number; y: number },
    rightCheek: { x: number; y: number },
    leftJaw: { x: number; y: number },
    rightJaw: { x: number; y: number },
    leftForehead: { x: number; y: number },
    rightForehead: { x: number; y: number },
    canvasWidth: number,
    canvasHeight: number
  ) => {
    // Set up styles for the lines
    const lineWidth = 2;
    const padding = 15; // Pixels to extend beyond face points
    const labelOffset = 10; // Distance for labels

    // Draw face length line (forehead to chin) - BLUE
    ctx.beginPath();
    ctx.moveTo(
      foreheadCenter.x * canvasWidth,
      (foreheadCenter.y - 0.03) * canvasHeight
    );
    ctx.lineTo(chinPoint.x * canvasWidth, (chinPoint.y + 0.02) * canvasHeight);
    ctx.strokeStyle = "rgba(0, 0, 255, 0.8)";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Add face length label
    ctx.fillStyle = "rgba(0, 0, 255, 0.9)";
    ctx.font = "bold 14px Arial";
    ctx.fillText(
      "Face Length",
      foreheadCenter.x * canvasWidth + labelOffset,
      ((foreheadCenter.y + chinPoint.y) / 2) * canvasHeight
    );

    // Draw face width line (cheek to cheek) - RED
    ctx.beginPath();
    ctx.moveTo((leftCheek.x - 0.02) * canvasWidth, leftCheek.y * canvasHeight);
    ctx.lineTo(
      (rightCheek.x + 0.02) * canvasWidth,
      rightCheek.y * canvasHeight
    );
    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Add face width label
    ctx.fillStyle = "rgba(255, 0, 0, 0.9)";
    ctx.font = "bold 14px Arial";
    ctx.fillText(
      "Face Width",
      ((leftCheek.x + rightCheek.x) / 2) * canvasWidth - 30,
      leftCheek.y * canvasHeight - labelOffset
    );

    // Draw jawline width line - GREEN
    ctx.beginPath();
    ctx.moveTo((leftJaw.x - 0.01) * canvasWidth, leftJaw.y * canvasHeight);
    ctx.lineTo((rightJaw.x + 0.01) * canvasWidth, rightJaw.y * canvasHeight);
    ctx.strokeStyle = "rgba(0, 128, 0, 0.8)";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Add jawline label
    ctx.fillStyle = "rgba(0, 128, 0, 0.9)";
    ctx.font = "bold 14px Arial";
    ctx.fillText(
      "Jawline Width",
      ((leftJaw.x + rightJaw.x) / 2) * canvasWidth - 40,
      ((leftJaw.y + rightJaw.y) / 2) * canvasHeight + 20
    );

    // Draw forehead width line - PURPLE
    ctx.beginPath();
    ctx.moveTo(
      (leftForehead.x - 0.01) * canvasWidth,
      leftForehead.y * canvasHeight
    );
    ctx.lineTo(
      (rightForehead.x + 0.01) * canvasWidth,
      rightForehead.y * canvasHeight
    );
    ctx.strokeStyle = "rgba(128, 0, 128, 0.8)";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Add forehead label
    ctx.fillStyle = "rgba(128, 0, 128, 0.9)";
    ctx.font = "bold 14px Arial";
    ctx.fillText(
      "Forehead Width",
      ((leftForehead.x + rightForehead.x) / 2) * canvasWidth - 45,
      ((leftForehead.y + rightForehead.y) / 2) * canvasHeight - 10
    );
  };

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
    // Use the current state of showMeasurements
    renderFaceMeshWithMeasurements(
      results,
      canvas,
      ctx,
      colorToUse,
      showMeasurements
    );
  };

  // Create a new function that takes the showMeasurements parameter
  const renderFaceMeshWithMeasurements = (
    results: any,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    colorToUse: string,
    shouldShowMeasurements: boolean
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks) {
      if (results.multiFaceLandmarks.length === 0) {
        setError("No face detected. Please upload a clear photo of a face.");
        return;
      }

      for (const landmarks of results.multiFaceLandmarks) {
        // Use the passed color parameter instead of the current meshColor state
        const transparentMeshColor = getTransparentColor(colorToUse);
        drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
          color: transparentMeshColor,
          lineWidth: 1,
        });

        // Extract specific landmarks
        const jawline = landmarks.slice(152, 379);
        const forehead = [landmarks[10], landmarks[151]];
        const cheekbones = [landmarks[123], landmarks[352]];

        // Calculate face metrics
        const faceLength = calculateDistance(
          forehead[0],
          jawline[jawline.length - 1]
        );
        const faceWidth = calculateDistance(cheekbones[0], cheekbones[1]);
        const jawlineWidth = calculateDistance(
          jawline[0],
          jawline[jawline.length - 1]
        );
        const foreheadWidth = calculateDistance(forehead[0], forehead[1]);

        // Draw measurement lines if enabled - using the passed parameter
        if (shouldShowMeasurements) {
          drawMeasurementLines(
            ctx,
            forehead[0],
            jawline[jawline.length - 1],
            cheekbones[0],
            cheekbones[1],
            jawline[0],
            jawline[jawline.length - 1],
            forehead[0],
            forehead[1],
            canvas.width,
            canvas.height
          );
        }

        // Calculate confidence scores for each face shape
        const scores = calculateConfidenceScores(
          faceLength,
          faceWidth,
          jawlineWidth,
          foreheadWidth
        );

        // Normalize scores to percentages
        const normalizedScores = normalizeScores(scores);

        // Update state
        setProbabilities(normalizedScores);
        setFaceLength(faceLength.toFixed(2));
        setFaceWidth(faceWidth.toFixed(2));
        setJawlineWidth(jawlineWidth.toFixed(2));

        // Update face shape
        const mostLikelyShape = Object.keys(normalizedScores).reduce((a, b) =>
          normalizedScores[a] > normalizedScores[b] ? a : b
        );
        setFaceShape(mostLikelyShape);
        setError(null); // Clear any previous errors

        // Set processing to complete
        setIsProcessing(true);
      }
    }
  };

  faceMesh.onResults(onResults);

  // Update handleFileUpload to use the ref
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

  // New function to process the face mesh
  const processFaceMesh = (img: HTMLImageElement, color: string) => {
    // Store the color separately to ensure it's available immediately
    faceMesh.send({ image: img });
  };

  // Modify the toggle button click handler to force redraw with the new value
  const toggleMeasurements = () => {
    const newShowMeasurements = !showMeasurements;
    setShowMeasurements(newShowMeasurements);

    // Force redraw if we have results
    if (lastResults && faceMeshCanvasRef.current) {
      const ctx = faceMeshCanvasRef.current.getContext("2d");
      if (ctx) {
        // Pass the new value directly to renderFaceMesh instead of relying on the state variable
        renderFaceMeshWithMeasurements(
          lastResults.results,
          faceMeshCanvasRef.current,
          ctx,
          lastResults.currentMeshColor,
          newShowMeasurements // Pass the new value here
        );
      }
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold mb-5">
        Upload a Photo to Detect Your Face Shape With AI
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-5"
      />
      {isProcessing && (
        <div className="mb-3">
          <button
            onClick={toggleMeasurements}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            {showMeasurements ? "Hide Measurements" : "Show Measurements"}
          </button>
        </div>
      )}
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
    </div>
  );
};

export default FileUpload;
