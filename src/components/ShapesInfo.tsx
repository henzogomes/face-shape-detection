import React from "react";
import { Link } from "react-router-dom";
import { FACE_SHAPES } from "../Constants";

interface ShapesInfoProps {
  highlightedShape?: string;
}

const ShapesInfo: React.FC<ShapesInfoProps> = ({ highlightedShape }) => {
  return (
    <section className="mt-8 " aria-labelledby="face-shapes-guide">
      <h2
        id="face-shapes-guide"
        className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
      >
        Face Shape Types Guide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {FACE_SHAPES.map((shape) => (
          <Link
            to={shape.path}
            key={shape.type}
            className={`block no-underline p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out ${
              highlightedShape?.toLowerCase() === shape.type
                ? "bg-orange-500 text-white"
                : "bg-white dark:bg-gray-800 text-black dark:text-white"
            }`}
          >
            <article className="h-full flex flex-col">
              <h3
                className={`text-lg font-semibold mb-2 capitalize transition-colors duration-300 ease-in-out ${
                  highlightedShape?.toLowerCase() === shape.type
                    ? "text-white"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {shape.type}
              </h3>
              <p
                className={`transition-colors duration-300 ease-in-out ${
                  highlightedShape?.toLowerCase() === shape.type
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-300"
                } mb-3 flex-grow`}
              >
                {shape.description}
              </p>
              <span
                className={`inline-block mt-2 transition-colors duration-300 ease-in-out ${
                  highlightedShape?.toLowerCase() === shape.type
                    ? "text-white hover:text-gray-100 underline"
                    : "text-blue-500 dark:text-blue-400 hover:underline"
                }`}
              >
                Learn more about {shape.type} face shape →
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShapesInfo;
