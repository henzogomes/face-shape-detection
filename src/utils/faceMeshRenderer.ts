import { drawConnectors } from "@mediapipe/drawing_utils";
import { FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import {
  calculateDistance,
  calculateConfidenceScores,
  normalizeScores,
} from "./faceShapeUtils";

// Function to add 50% transparency to a hex color
export const getTransparentColor = (hex: string): string => {
  // Convert hex to RGBA with 50% transparency
  return `${hex}99`;
};

// Function to draw measurement lines on the face
export const drawMeasurementLines = (
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
  ctx.lineTo((rightCheek.x + 0.02) * canvasWidth, rightCheek.y * canvasHeight);
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

// Function to render the face mesh
export const renderFaceMeshWithMeasurements = (
  results: any,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  colorToUse: string,
  shouldShowMeasurements: boolean,
  callbacks: {
    setError: (error: string | null) => void;
    setProbabilities: (probs: { [key: string]: number }) => void;
    setFaceLength: (length: string) => void;
    setFaceWidth: (width: string) => void;
    setJawlineWidth: (width: string) => void;
    setFaceShape: (shape: string) => void;
  }
) => {
  const {
    setError,
    setProbabilities,
    setFaceLength,
    setFaceWidth,
    setJawlineWidth,
    setFaceShape,
  } = callbacks;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.multiFaceLandmarks) {
    if (results.multiFaceLandmarks.length === 0) {
      setError("No face detected. Please upload a clear photo of a face.");
      return;
    }

    for (const landmarks of results.multiFaceLandmarks) {
      // Use the passed color parameter
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

      // Draw measurement lines if enabled
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

      // Update state via callbacks
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
