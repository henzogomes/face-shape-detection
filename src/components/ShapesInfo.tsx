import React from "react";
import { Link } from "react-router-dom";
import { FACE_SHAPES } from "../Constants";

interface ShapesInfoProps {
  highlightedShape?: string;
}

const ShapesInfo: React.FC<ShapesInfoProps> = ({ highlightedShape }) => {
  return (
    <section className="mt-8" aria-labelledby="face-shapes-guide">
      <h2 id="face-shapes-guide" className="text-xl font-bold mb-4">
        Face Shape Types Guide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FACE_SHAPES.map((shape) => (
          <article
            key={shape.type}
            className={`p-4 rounded-lg shadow ${
              highlightedShape?.toLowerCase() === shape.type
                ? "bg-orange-500 text-white"
                : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 capitalize ${
                highlightedShape?.toLowerCase() === shape.type
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >
              {shape.type}
            </h3>
            <p
              className={`${
                highlightedShape?.toLowerCase() === shape.type
                  ? "text-white"
                  : "text-gray-600"
              } mb-3`}
            >
              {shape.description}
            </p>
            <Link
              to={shape.path}
              className={`inline-block mt-2 ${
                highlightedShape?.toLowerCase() === shape.type
                  ? "text-white hover:text-gray-100 underline"
                  : "text-blue-500 hover:underline"
              }`}
            >
              Learn more about {shape.type} face shape →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShapesInfo;
