import React from "react";
import { Link } from "react-router-dom";
import { FACE_SHAPES } from "../Constants";
import { FaceShapeType } from "../types/types";

interface FaceShapeLinksProps {
  currentShape: FaceShapeType;
}

const FaceShapeLinks: React.FC<FaceShapeLinksProps> = ({ currentShape }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Compare With Other Face Shapes
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {FACE_SHAPES.filter((shape) => shape.type !== currentShape).map(
          (shape) => (
            <Link
              key={shape.type}
              to={shape.path}
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)} Face
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default FaceShapeLinks;
