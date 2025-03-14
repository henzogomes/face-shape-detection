/**
 * Utility to resize images before processing with face detection
 */
export const resizeImage = (
  img: HTMLImageElement,
  minWidth: number = 800,
  maxWidth: number = 1200
): HTMLCanvasElement => {
  // Create an offscreen canvas for resizing
  const canvas = document.createElement("canvas");
  let width = img.width;
  let height = img.height;

  // Calculate new dimensions while preserving aspect ratio
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  } else if (width < minWidth) {
    height = Math.round((height * minWidth) / width);
    width = minWidth;
  }

  // Set canvas dimensions
  canvas.width = width;
  canvas.height = height;

  // Draw resized image onto canvas
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0, width, height);
  }

  return canvas;
};
