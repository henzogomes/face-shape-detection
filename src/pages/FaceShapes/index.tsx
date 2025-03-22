import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import { FACE_SHAPES } from "../../Constants";

const FaceShapes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Face Shape Guide"
        description="Learn about different face shapes - oval, round, square, heart, diamond, and oblong - and how to identify yours."
        keywords="face shapes, face shape guide, types of face shapes, face shape characteristics"
        path="/face-shapes"
      />
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Complete Face Shape Guide
        </h1>

        <section className="mb-8">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Understanding your face shape is key to finding the most flattering
            hairstyles, glasses, and makeup techniques. There are six primary
            face shapes, each with unique characteristics and proportions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Face Shape Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FACE_SHAPES.map((shape) => (
              <Link
                to={shape.path}
                key={shape.type}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 ease-in-out block no-underline"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 capitalize text-gray-900 dark:text-white">
                    {shape.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {shape.shortDescription}
                  </p>
                  <span className="text-blue-500 dark:text-blue-400 hover:underline font-medium">
                    Learn more about {shape.type} face shape →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Not Sure About Your Face Shape?
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Use our advanced AI face shape detection tool to accurately
            determine your face shape.
          </p>
          <Link
            to="/detect"
            className="inline-block bg-gray-800 text-white border border-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded"
          >
            Try Our Face Shape Detection Tool
          </Link>
        </section>
      </article>
    </>
  );
};

export default FaceShapes;
