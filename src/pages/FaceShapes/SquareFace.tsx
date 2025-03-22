import React from "react";
import SEO from "../../components/SEO";
import FaceShapeLinks from "../../components/FaceShapeLinks";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaceShapeDetectionCTA from "../../components/FaceShapeDetectionCTA";

const SquareFace: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Face Shapes", path: "/face-shapes" },
    { label: "Square" },
  ];

  return (
    <>
      <SEO
        title="Square Face Shape Guide"
        description="Learn about square face shape characteristics, best hairstyles, glasses, and makeup recommendations for square faces."
        keywords="square face shape, square face hairstyles, glasses for square face, square face makeup"
        path="/face-shapes/square"
      />
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Square Face Shape
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Characteristics of a Square Face
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              The square face shape features strong, defined angles and equal
              proportions:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Strong, angular jawline</li>
              <li>Forehead and jawline approximately equal in width</li>
              <li>Minimal curve at the chin</li>
              <li>Well-defined cheekbones</li>
              <li>Face width and length in similar proportions</li>
            </ul>
            <p className="mb-4">
              Square faces project strength and confidence with their defined
              structure.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Best Hairstyles for Square Faces
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              Ideal hairstyles for square faces soften the angular jawline and
              add height:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Layered cuts with volume on top to elongate the face</li>
              <li>Side-swept bangs to soften the forehead</li>
              <li>Wavy or curly styles to balance angular features</li>
              <li>Long, face-framing layers that extend below the jaw</li>
              <li>Asymmetrical cuts that create diagonal lines</li>
            </ul>
            <p>
              Avoid blunt-cut bangs, one-length bobs that hit at the jaw, or any
              style that emphasizes the squareness of your face.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Eyewear for Square Faces
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              The best eyewear choices for square faces soften angles and create
              balance:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Round or oval frames to contrast with angular features</li>
              <li>Rimless or semi-rimless styles for a softer look</li>
              <li>Frames with curved edges and soft corners</li>
              <li>Cat-eye shapes to draw attention upward</li>
              <li>Thin frames with minimal visual weight</li>
            </ul>
            <p>
              Avoid square or rectangular frames that mirror your face shape and
              can make features appear more angular.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Makeup Tips for Square Faces
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              Makeup techniques can help soften the angular features of a square
              face:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Contour the temples and jawline corners to soften angles</li>
              <li>
                Apply blush in a rounded, circular motion on the apples of the
                cheeks
              </li>
              <li>
                Highlight the center of the forehead and chin to create
                dimension
              </li>
              <li>Use rounded, soft brow shapes rather than angular arches</li>
              <li>
                Focus on creating curves with makeup to balance angular features
              </li>
            </ul>
            <p>
              Avoid harsh contour lines or sharp angles in your makeup
              application that might emphasize the squareness of your face.
            </p>
          </div>
        </section>

        <FaceShapeDetectionCTA faceShape="square" />

        <FaceShapeLinks currentShape="square" />
      </article>
    </>
  );
};

export default SquareFace;
