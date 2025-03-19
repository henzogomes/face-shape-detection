import React from "react";
import SEO from "../components/SEO";
import { defaultStructuredData } from "../Constants";

const About: React.FC = () => {
  defaultStructuredData["@type"] = "Article";
  return (
    <>
      <SEO
        title="About Face Shape Detection"
        description="Learn how our AI-powered face shape detection tool works and how to interpret your results."
        keywords="face shape technology, AI face detection, about face shape detection"
        path="/about"
        structuredData={defaultStructuredData}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About This Tool</h1>
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-700">
            Face Shape Detector is an AI-powered tool that helps you determine
            your face shape using advanced facial recognition technology.
          </p>
          <p className="mb-4 text-gray-700">
            Our application uses machine learning algorithms to analyze facial
            features and provide accurate face shape classifications.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
