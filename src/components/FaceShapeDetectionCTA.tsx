import React from "react";
import { Link } from "react-router-dom";
import { FaceShapeType } from "../types/types";

interface FaceShapeDetectionCTAProps {
  faceShape: FaceShapeType;
}

const FaceShapeDetectionCTA: React.FC<FaceShapeDetectionCTAProps> = ({
  faceShape,
}) => {
  const capitalizedShape =
    faceShape.charAt(0).toUpperCase() + faceShape.slice(1);

  return (
    <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Not Sure if You Have a
        {faceShape === "oval" || faceShape === "oblong" ? "n" : ""}{" "}
        {capitalizedShape} Face?
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Our AI-powered face shape detection tool can analyze your facial
        features and determine your face shape with precision.
      </p>
      <Link
        to="/detect"
        className="inline-block bg-gray-800 text-white border border-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded"
      >
        Detect Your Face Shape
      </Link>
    </section>
  );
};

export default FaceShapeDetectionCTA;
