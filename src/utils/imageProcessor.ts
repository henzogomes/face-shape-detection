import { ColorExtractor } from "./ColorExtractor";
import { resizeImage } from "./imageResizer";
import { FaceMesh } from "@mediapipe/face_mesh";

interface ImageProcessingResult {
  resizedWidth: number;
  resizedHeight: number;
  resizedCanvas: HTMLCanvasElement;
  extractedColor: string;
}

/**
 * Process uploaded image: resize and extract color
 */
export const processUploadedImage = (
  img: HTMLImageElement
): ImageProcessingResult => {
  // Resize the image to optimal dimensions
  const resizedCanvas = resizeImage(img);
  const resizedWidth = resizedCanvas.width;
  const resizedHeight = resizedCanvas.height;

  // Extract predominant color from the image
  const predominantColor =
    ColorExtractor.extractPredominantColor(resizedCanvas);
  const extractedColor = predominantColor.hex;

  return {
    resizedWidth,
    resizedHeight,
    resizedCanvas,
    extractedColor,
  };
};

/**
 * Display image on canvas and process with FaceMesh
 */
export const displayAndProcessImage = (
  imgProcessingResult: ImageProcessingResult,
  photoCanvas: HTMLCanvasElement,
  faceMeshCanvas: HTMLCanvasElement,
  faceMesh: FaceMesh
): void => {
  const { resizedWidth, resizedHeight, resizedCanvas } = imgProcessingResult;

  // Set canvas dimensions to match the resized image
  photoCanvas.width = resizedWidth;
  photoCanvas.height = resizedHeight;
  faceMeshCanvas.width = resizedWidth;
  faceMeshCanvas.height = resizedHeight;

  // Draw the resized image on the photo canvas
  const photoCtx = photoCanvas.getContext("2d");
  if (photoCtx) {
    photoCtx.drawImage(resizedCanvas, 0, 0, resizedWidth, resizedHeight);
  }

  // Process the face mesh with the resized image
  faceMesh.send({ image: resizedCanvas });
};
