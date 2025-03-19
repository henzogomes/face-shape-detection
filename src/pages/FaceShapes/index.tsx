import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { FACE_SHAPES } from "../../Constants";

const FaceShapes: React.FC = () => {
  return (
    <>
      <SEO
        title="Face Shape Guide"
        description="Learn about different face shapes - oval, round, square, heart, diamond, and oblong - and how to identify yours."
        keywords="face shapes, face shape guide, types of face shapes, face shape characteristics"
        path="/face-shapes"
      />
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complete Face Shape Guide</h1>

        <section className="mb-8">
          <p className="mb-4 text-gray-700">
            Understanding your face shape is key to finding the most flattering
            hairstyles, glasses, and makeup techniques. There are six primary
            face shapes, each with unique characteristics and proportions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Face Shape Types</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FACE_SHAPES.map((shape) => (
              <div key={shape.type} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-xl font-bold mb-2 capitalize">
                  {shape.type}
                </h3>
                <p className="text-gray-600 mb-3">{shape.shortDescription}</p>
                <Link
                  to={shape.path}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Learn more about {shape.type} face shape →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Not Sure About Your Face Shape?
          </h2>
          <p className="mb-4 text-gray-700">
            Use our advanced AI face shape detection tool to accurately
            determine your face shape.
          </p>
          <Link
            to="/detect"
            className="inline-block bg-gray-800 text-white border border-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded"
          >
            Try Our Face Shape Detection Tool
          </Link>
        </section>
      </article>
    </>
  );
};

export default FaceShapes;
