import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { drawConnectors } from "@mediapipe/drawing_utils";
import { Vibrant } from "node-vibrant/browser";

// Initialize Face Mesh
const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  },
});

// Configure Face Mesh options
faceMesh.setOptions({
  maxNumFaces: 1, // Detect only one face
  refineLandmarks: true, // Use refined landmarks for better accuracy
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

// Get the canvases and their contexts
const photoCanvas = document.getElementById("photoCanvas") as HTMLCanvasElement;
const photoCtx = photoCanvas.getContext("2d")!;
const faceMeshCanvas = document.getElementById(
  "faceMeshCanvas"
) as HTMLCanvasElement;
const faceMeshCtx = faceMeshCanvas.getContext("2d")!;

// Define ideal ratios for each face shape
const idealRatios = {
  oblong: { lengthToWidth: 1.6, jawlineToWidth: 0.7, foreheadToWidth: 0.8 },
  round: { lengthToWidth: 1.0, jawlineToWidth: 0.9, foreheadToWidth: 0.9 },
  heart: { lengthToWidth: 1.2, jawlineToWidth: 0.6, foreheadToWidth: 0.85 },
  square: { lengthToWidth: 1.1, jawlineToWidth: 1.0, foreheadToWidth: 0.9 },
  oval: { lengthToWidth: 1.4, jawlineToWidth: 0.8, foreheadToWidth: 0.85 },
  diamond: { lengthToWidth: 1.3, jawlineToWidth: 0.7, foreheadToWidth: 0.5 },
};

// Define tolerance ranges for each face shape characteristic
const toleranceRanges = {
  oblong: { lengthToWidth: 0.3, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  round: { lengthToWidth: 0.3, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  heart: { lengthToWidth: 0.3, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  square: { lengthToWidth: 0.3, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  oval: { lengthToWidth: 0.3, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  diamond: { lengthToWidth: 0.3, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
};

// Function to calculate the distance between two points
function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}

// Function to calculate confidence scores for each face shape
function calculateConfidenceScores(
  faceLength: number,
  faceWidth: number,
  jawlineWidth: number,
  foreheadWidth: number
): { [key: string]: number } {
  const userLengthToWidth = faceLength / faceWidth;
  const userJawlineToWidth = jawlineWidth / faceWidth;
  const userForeheadToWidth = foreheadWidth / faceWidth;

  console.log("User Measurements:", {
    lengthToWidth: userLengthToWidth,
    jawlineToWidth: userJawlineToWidth,
    foreheadToWidth: userForeheadToWidth,
  });

  const scores: { [key: string]: number } = {};

  for (const [shape, ratios] of Object.entries(idealRatios)) {
    const tolerances = toleranceRanges[shape as keyof typeof toleranceRanges];

    // Calculate how close each measurement is to the ideal
    const lengthToWidthFit = calculateFitScore(
      userLengthToWidth,
      ratios.lengthToWidth,
      tolerances.lengthToWidth
    );

    const jawlineToWidthFit = calculateFitScore(
      userJawlineToWidth,
      ratios.jawlineToWidth,
      tolerances.jawlineToWidth
    );

    const foreheadToWidthFit = calculateFitScore(
      userForeheadToWidth,
      ratios.foreheadToWidth,
      tolerances.foreheadToWidth
    );

    // Weight the different measurements - using a moderate exponent
    const confidence = Math.pow(
      0.5 * lengthToWidthFit +
        0.3 * jawlineToWidthFit +
        0.2 * foreheadToWidthFit,
      1.5 // Moderate exponent for some differentiation
    );

    scores[shape] = confidence;
  }

  return scores;
}

// Helper function to calculate how well a measurement fits within a tolerance range
function calculateFitScore(
  userValue: number,
  idealValue: number,
  tolerance: number
): number {
  const difference = Math.abs(userValue - idealValue);

  // If within tolerance, calculate a score between 0 and 1
  if (difference <= tolerance) {
    // The closer to ideal, the higher the score (approaching 1)
    return 1 - (difference / tolerance) * 0.7; // Scale to keep minimum score around 0.3
  }

  // Outside tolerance range, calculate a diminishing score
  // This formula will prevent scores from dropping too quickly
  return Math.max(0.2, 0.7 / (1 + difference - tolerance));
}

// Function to normalize scores to percentages with controlled distribution
function normalizeScores(scores: { [key: string]: number }): {
  [key: string]: number;
} {
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const range = maxScore - minScore;

  // First pass: apply moderate scaling with a baseline
  const baselineScore = 0.2; // Ensure even lowest scores get some percentage
  const scaledScores: { [key: string]: number } = {};

  for (const shape of Object.keys(scores)) {
    // Scale scores but maintain a minimum baseline
    const relativeScore = (scores[shape] - minScore) / range;
    scaledScores[shape] = baselineScore + relativeScore * (1 - baselineScore);
  }

  // Apply a moderate temperature factor to create separation
  const temperature = 2.0; // Moderate temperature
  const normalized: { [key: string]: number } = {};
  let total = 0;

  for (const shape of Object.keys(scaledScores)) {
    const exponentiatedScore = Math.pow(scaledScores[shape], temperature);
    normalized[shape] = exponentiatedScore;
    total += exponentiatedScore;
  }

  // Convert to percentages
  for (const shape of Object.keys(normalized)) {
    normalized[shape] = (normalized[shape] / total) * 100;
  }

  return normalized;
}

// Function to display face shape probabilities
function displayFaceShapeProbabilities(scores: { [key: string]: number }) {
  const percentageBars = document.getElementById("percentageBars")!;
  percentageBars.innerHTML = ""; // Clear previous content

  // Sort shapes by descending percentage
  const sortedShapes = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  for (const [shape, percentage] of sortedShapes) {
    const barContainer = document.createElement("div");
    barContainer.className = "progress-bar";

    const barFill = document.createElement("div");
    barFill.className = "progress-bar-fill";
    barFill.style.width = `${percentage}%`;
    barFill.textContent = `${shape}: ${percentage.toFixed(1)}%`;

    barContainer.appendChild(barFill);
    percentageBars.appendChild(barContainer);
  }
}

// Function to extract prominent colors from the image using node-vibrant
async function extractImageColors(image: HTMLImageElement): Promise<string> {
  const vibrant = new Vibrant(image);
  const palette = await vibrant.getPalette();
  return palette.Vibrant?.hex || "#C0C0C0"; // Use the vibrant color or fallback to gray
}

// Function to draw facial landmarks on the canvas and classify the face shape
async function drawLandmarks(results: any) {
  faceMeshCtx.clearRect(0, 0, faceMeshCanvas.width, faceMeshCanvas.height); // Clear the face mesh canvas
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
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

      // Display the probabilities
      displayFaceShapeProbabilities(normalizedScores);

      // Update the webpage with the results
      const mostLikelyShape = Object.keys(normalizedScores).reduce((a, b) =>
        normalizedScores[a] > normalizedScores[b] ? a : b
      );
      document.getElementById("faceShapeResult")!.textContent = mostLikelyShape;
      document.getElementById("faceLengthResult")!.textContent =
        faceLength.toFixed(2);
      document.getElementById("faceWidthResult")!.textContent =
        faceWidth.toFixed(2);
      document.getElementById("jawlineWidthResult")!.textContent =
        jawlineWidth.toFixed(2);

      // Extract colors from the image and draw the face mesh
      const img = document.createElement("img");
      img.src = photoCanvas.toDataURL(); // Get the uploaded image from the canvas

      // Wait for the image to load
      img.onload = async () => {
        const meshColor = await extractImageColors(img); // Extract color from the image
        drawConnectors(faceMeshCtx, landmarks, FACEMESH_TESSELATION, {
          color: meshColor, // Use the extracted color
          lineWidth: 1,
        });
      };
    }
  }
}

// Set up the Face Mesh results callback
function main() {
  faceMesh.onResults((results) => {
    drawLandmarks(results); // Draw landmarks and classify face shape
  });
}

// Handle image uploads
const photoInput = document.getElementById("photoInput") as HTMLInputElement;

photoInput.addEventListener("change", (event) => {
  const file = (event.target as HTMLInputElement).files![0];
  if (file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      console.log("Image loaded successfully:", img.width, img.height);

      // Set canvas dimensions to match the image
      photoCanvas.width = img.width;
      photoCanvas.height = img.height;
      faceMeshCanvas.width = img.width;
      faceMeshCanvas.height = img.height;

      console.log("Canvas dimensions:", photoCanvas.width, photoCanvas.height);

      // Draw the uploaded image on the photo canvas
      photoCtx.drawImage(img, 0, 0, img.width, img.height);

      // Process the image with Face Mesh
      faceMesh.send({ image: img });
    };
    img.onerror = (error) => {
      console.error("Error loading image:", error);
    };
  }
});

// Start the application
main();
