// colorExtractor.ts
/**
 * Extracts the predominant color from an image
 */
export class ColorExtractor {
  // Reduce pixel data for faster processing
  private static readonly SAMPLE_SIZE = 10; // Sample 1 out of every 10 pixels

  /**
   * Extract the predominant color from an image
   * @param image - The image to analyze
   * @returns An object containing the dominant color in RGB and hex format
   */
  static extractPredominantColor(image: HTMLImageElement | HTMLCanvasElement): {
    r: number;
    g: number;
    b: number;
    hex: string;
  } {
    // Create a canvas to get pixel data
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Set dimensions
    const width = image instanceof HTMLImageElement ? image.width : image.width;
    const height =
      image instanceof HTMLImageElement ? image.height : image.height;
    canvas.width = width;
    canvas.height = height;

    // Draw image to canvas
    context.drawImage(image, 0, 0, width, height);

    // Get pixel data
    const imageData = context.getImageData(0, 0, width, height).data;

    // Initialize color buckets
    const colorCounts: {
      [key: string]: { count: number; r: number; g: number; b: number };
    } = {};

    // Process pixels with sampling to reduce computation
    for (let i = 0; i < imageData.length; i += 4 * this.SAMPLE_SIZE) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      // Skip transparent pixels
      if (a < 128) continue;

      // Simplify colors to reduce number of buckets (group similar colors)
      const quantizedR = Math.floor(r / 16) * 16;
      const quantizedG = Math.floor(g / 16) * 16;
      const quantizedB = Math.floor(b / 16) * 16;

      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;

      if (!colorCounts[colorKey]) {
        colorCounts[colorKey] = {
          count: 0,
          r: quantizedR,
          g: quantizedG,
          b: quantizedB,
        };
      }

      colorCounts[colorKey].count++;
    }

    // Find the most common color
    let maxCount = 0;
    let dominantColor = { r: 0, g: 0, b: 0 };

    for (const key in colorCounts) {
      if (colorCounts[key].count > maxCount) {
        maxCount = colorCounts[key].count;
        dominantColor = {
          r: colorCounts[key].r,
          g: colorCounts[key].g,
          b: colorCounts[key].b,
        };
      }
    }

    // Create hex value
    const hex = this.rgbToHex(
      dominantColor.r,
      dominantColor.g,
      dominantColor.b
    );

    return {
      ...dominantColor,
      hex,
    };
  }

  /**
   * Convert RGB components to hex format
   */
  private static rgbToHex(r: number, g: number, b: number): string {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  /**
   * Generate a contrasting color to ensure visibility
   * @param color - The base color to generate contrast against
   * @returns A contrasting color in hex format
   */
  static getContrastColor(color: { r: number; g: number; b: number }): string {
    // Calculate luminance using the formula for relative luminance
    const luminance =
      (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;

    // Choose white or black based on luminance
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }
}
