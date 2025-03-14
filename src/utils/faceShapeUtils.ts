// src/utils/faceShapeUtils.ts

// Define ideal ratios for each face shape
const idealRatios = {
  // OBLONG: Similar widths but longer length
  oblong: {
    lengthToWidth: 1.75, // Increased (was 1.6) - notably longer face
    jawlineToWidth: 0.85, // Increased (was 0.7) - similar widths
    foreheadToWidth: 0.85, // Increased (was 0.8) - similar widths
  },

  // OVAL: Slightly wider forehead than chin, gentle curves
  oval: {
    lengthToWidth: 1.5, // Increased (was 1.4) - notably longer than wide
    jawlineToWidth: 0.75, // Slightly decreased (was 0.8) - narrower jaw
    foreheadToWidth: 0.9, // Increased (was 0.85) - wider forehead
  },

  // SQUARE: Equal widths, strong jaw
  square: {
    lengthToWidth: 1.1, // Kept same - nearly equal length and width
    jawlineToWidth: 0.95, // Slightly decreased (was 1.0) - strong but not extreme
    foreheadToWidth: 0.95, // Increased (was 0.9) - equal widths
  },

  // ROUND: Soft curves, similar measurements
  round: {
    lengthToWidth: 1.1, // Increased (was 1.0) - slightly longer than perfectly round
    jawlineToWidth: 0.85, // Decreased (was 0.9) - softer jaw
    foreheadToWidth: 0.85, // Decreased (was 0.9) - gentle curves
  },

  // HEART: Wide forehead, narrow chin
  heart: {
    lengthToWidth: 1.3, // Increased (was 1.2) - more pronounced length
    jawlineToWidth: 0.65, // Increased (was 0.6) - narrow but not extreme
    foreheadToWidth: 0.95, // Increased (was 0.85) - distinctly wider forehead
  },

  // DIAMOND: Pointed chin, wide cheekbones, narrow forehead
  diamond: {
    lengthToWidth: 1.4, // Increased (was 1.3) - more elongated
    jawlineToWidth: 0.65, // Keep the narrow jaw
    foreheadToWidth: 0.6, // Decrease to make forehead narrower relative to cheekbones
  },
};

// Define tolerance ranges for each face shape characteristic
const toleranceRanges = {
  oblong: { lengthToWidth: 0.3, jawlineToWidth: 0.15, foreheadToWidth: 0.15 },
  oval: { lengthToWidth: 0.25, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  square: { lengthToWidth: 0.2, jawlineToWidth: 0.15, foreheadToWidth: 0.15 },
  round: { lengthToWidth: 0.2, jawlineToWidth: 0.2, foreheadToWidth: 0.2 },
  heart: { lengthToWidth: 0.25, jawlineToWidth: 0.15, foreheadToWidth: 0.2 },
  diamond: { lengthToWidth: 0.25, jawlineToWidth: 0.15, foreheadToWidth: 0.15 },
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

    // Increased exponent for more differentiation and adjusted weights
    const confidence = Math.pow(
      0.6 * lengthToWidthFit +
        0.25 * jawlineToWidthFit +
        0.15 * foreheadToWidthFit,
      2.5 // Increased exponent for more spread
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

  // Reduced baseline for more spread
  const baselineScore = 0.1; // Reduced from 0.2
  const scaledScores: { [key: string]: number } = {};

  for (const shape of Object.keys(scores)) {
    const relativeScore = (scores[shape] - minScore) / range;
    scaledScores[shape] = baselineScore + relativeScore * (1 - baselineScore);
  }

  // Increased temperature for more dramatic separation
  const temperature = 3.5; // Increased from 2.0
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
