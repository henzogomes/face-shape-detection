import { FaceShape } from "./types/types";

export const APP_NAME = "Face Shape Detection";
export const APP_DESCRIPTION =
  "Discover your unique face shape with our AI-powered detection tool. Upload a photo and get instant results.";
export const APP_ICON = "✨";
export const APP_VERSION = "1.1.0";
export const APP_BASE_URL = "https://myfaceshape.pro";
export const KEYWORDS =
  "face shape, face detection, facial analysis, AI face shape detection";

export const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Face Shape Detection Tool",
  applicationCategory: "UtilityApplication",
  description:
    "Upload your photo to analyze and determine your face shape using AI technology.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

// Face shape information
export const FACE_SHAPES: FaceShape[] = [
  {
    type: "oval",
    description:
      "Features a face that's longer than wide with a gently curved jawline and a forehead slightly wider than the chin, creating balanced proportions.",
    shortDescription:
      "Features a face that's longer than wide with a gently curved jawline and a forehead slightly wider than the chin.",
    path: "/face-shapes/oval",
  },
  {
    type: "round",
    description:
      "Distinguished by soft curves with similar width and length measurements, fuller cheeks, and an absence of sharp angles along the jawline.",
    shortDescription:
      "Distinguished by soft curves with similar width and length measurements and fuller cheeks.",
    path: "/face-shapes/round",
  },
  {
    type: "square",
    description:
      "Defined by a strong, angular jawline and forehead that are approximately equal in width, creating a boxier facial structure.",
    shortDescription:
      "Defined by a strong, angular jawline and forehead that are approximately equal in width.",
    path: "/face-shapes/square",
  },
  {
    type: "heart",
    description:
      "Presents with a wider forehead and high cheekbones that taper to a narrow, sometimes pointed chin, resembling an inverted triangle.",
    shortDescription:
      "Presents with a wider forehead and high cheekbones that taper to a narrow, sometimes pointed chin.",
    path: "/face-shapes/heart",
  },
  {
    type: "diamond",
    description:
      "Features prominent cheekbones as the widest point, with both forehead and jawline narrower, and often a defined, pointed chin.",
    shortDescription:
      "Features prominent cheekbones as the widest point, with both forehead and jawline narrower.",
    path: "/face-shapes/diamond",
  },
  {
    type: "oblong",
    description:
      "Characterized by a face length noticeably longer than its width, with forehead, cheekbones, and jawline having similar widths throughout.",
    shortDescription:
      "Characterized by a face length noticeably longer than its width, with consistent width throughout.",
    path: "/face-shapes/oblong",
  },
];
