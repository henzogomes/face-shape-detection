import React from "react";

const About: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        About Face Shape Detector
      </h1>
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
  );
};

export default About;
