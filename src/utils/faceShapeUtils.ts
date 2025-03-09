// src/utils/faceShapeUtils.ts

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
export const calculateDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
};

// Function to calculate confidence scores for each face shape
export const calculateConfidenceScores = (
  faceLength: number,
  faceWidth: number,
  jawlineWidth: number,
  foreheadWidth: number
): { [key: string]: number } => {
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
};

// Helper function to calculate how well a measurement fits within a tolerance range
const calculateFitScore = (
  userValue: number,
  idealValue: number,
  tolerance: number
): number => {
  const difference = Math.abs(userValue - idealValue);

  // If within tolerance, calculate a score between 0 and 1
  if (difference <= tolerance) {
    // The closer to ideal, the higher the score (approaching 1)
    return 1 - (difference / tolerance) * 0.7; // Scale to keep minimum score around 0.3
  }

  // Outside tolerance range, calculate a diminishing score
  // This formula will prevent scores from dropping too quickly
  return Math.max(0.2, 0.7 / (1 + difference - tolerance));
};

// Function to normalize scores to percentages with controlled distribution
export const normalizeScores = (scores: {
  [key: string]: number;
}): {
  [key: string]: number;
} => {
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
};
