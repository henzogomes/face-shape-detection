import React from "react";
import FaceAnalyzer from "../components/FaceAnalyzer";

const Detect: React.FC = () => {
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5 text-center">
        ✨ Face Shape Detection
      </h1>
      <FaceAnalyzer />
    </div>
  );
};

export default Detect;
