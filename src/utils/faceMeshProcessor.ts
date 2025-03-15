import { FaceMesh } from "@mediapipe/face_mesh";
import { renderFaceMeshWithMeasurements } from "./faceMeshRenderer";

// Type for the render callbacks
export interface RenderCallbacks {
  setError: (error: string | null) => void;
  setProbabilities: (probs: { [key: string]: number }) => void;
  setFaceLength: (length: string) => void;
  setFaceWidth: (width: string) => void;
  setJawlineWidth: (width: string) => void;
  setFaceShape: (shape: string) => void;
}

// Type for results storage
export interface FaceMeshResults {
  results: any;
  currentMeshColor: string;
}

/**
 * Creates and configures a FaceMesh instance
 */
export const createFaceMesh = (
  onResultsCallback: (results: any) => void
): FaceMesh => {
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

  faceMesh.onResults(onResultsCallback);
  return faceMesh;
};

/**
 * Process face mesh results and render to canvas
 */
export const processFaceMeshResults = (
  results: any,
  canvas: HTMLCanvasElement,
  colorToUse: string,
  showMeasurements: boolean,
  callbacks: RenderCallbacks,
  setIsProcessing: (value: boolean) => void
): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  renderFaceMeshWithMeasurements(
    results,
    canvas,
    ctx,
    colorToUse,
    showMeasurements,
    callbacks
  );

  // Set processing to complete
  setIsProcessing(false);
};

/**
 * Re-renders existing face mesh results when display options change
 */
export const reRenderFaceMesh = (
  storedResults: FaceMeshResults | null,
  canvas: HTMLCanvasElement | null,
  showMeasurements: boolean,
  callbacks: RenderCallbacks
): void => {
  if (!storedResults || !canvas) return;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    renderFaceMeshWithMeasurements(
      storedResults.results,
      canvas,
      ctx,
      storedResults.currentMeshColor,
      showMeasurements,
      callbacks
    );
  }
};
