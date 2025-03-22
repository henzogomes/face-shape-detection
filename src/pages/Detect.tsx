import React from "react";
import FaceAnalyzer from "../components/FaceAnalyzer";
import SEO from "../components/SEO";
import { defaultStructuredData } from "../Constants";

const Detect: React.FC = () => {
  return (
    <>
      <SEO
        title="Detect Your Face Shape"
        description="Upload a photo to our AI tool and discover your face shape - oval, round, square, heart, diamond, or oblong."
        keywords="face shape detection, AI face analyzer, face width measurement, facial analysis"
        path="/detect"
        structuredData={defaultStructuredData}
      />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Face Shape Detection
        </h1>
        <FaceAnalyzer />
      </div>
    </>
  );
};

export default Detect;
