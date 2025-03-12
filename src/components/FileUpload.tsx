// src/components/FileUpload.tsx
import React, { useRef } from "react";
import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { drawConnectors } from "@mediapipe/drawing_utils";
import {
  calculateDistance,
  calculateConfidenceScores,
  normalizeScores,
} from "../utils/faceShapeUtils";

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

  // Handle Face Mesh results
  const onResults = (results: any) => {
    const faceMeshCanvas = faceMeshCanvasRef.current;
    if (!faceMeshCanvas) return;

    const faceMeshCtx = faceMeshCanvas.getContext("2d");
    if (!faceMeshCtx) return;

    faceMeshCtx.clearRect(0, 0, faceMeshCanvas.width, faceMeshCanvas.height);

    if (results.multiFaceLandmarks) {
      if (results.multiFaceLandmarks.length === 0) {
        setError("No face detected. Please upload a clear photo of a face.");
        return;
      }

      for (const landmarks of results.multiFaceLandmarks) {
        // Draw face mesh
        drawConnectors(faceMeshCtx, landmarks, FACEMESH_TESSELATION, {
          color: "#FF0000",
          lineWidth: 1,
        });

        // Extract specific landmarks
        const jawline = landmarks.slice(152, 379); // Jawline landmarks
        const forehead = [landmarks[10], landmarks[151]]; // Forehead landmarks
        const cheekbones = [landmarks[123], landmarks[352]]; // Cheekbone landmarks

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
      }
    }
  };

  faceMesh.onResults(onResults);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Please select a valid image file.");
      return;
    }

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

        // Send image to Face Mesh
        faceMesh.send({ image: img });
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
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-5"
      />
      <div className="relative flex justify-center">
        <canvas
          ref={photoCanvasRef}
          className="border border-gray-300 max-w-full"
        />
        <canvas
          ref={faceMeshCanvasRef}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none border border-gray-300 max-w-full"
        />
      </div>
    </div>
  );
};

export default FileUpload;
