import React from "react";
import SEO from "../../components/SEO";
import FaceShapeLinks from "../../components/FaceShapeLinks";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaceShapeDetectionCTA from "../../components/FaceShapeDetectionCTA";

const DiamondFace: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Face Shapes", path: "/face-shapes" },
    { label: "Diamond" },
  ];

  return (
    <>
      <SEO
        title="Diamond Face Shape Guide"
        description="Learn about diamond face shape characteristics, best hairstyles, glasses, and makeup recommendations for diamond faces."
        keywords="diamond face shape, diamond face hairstyles, glasses for diamond face, diamond face makeup"
        path="/face-shapes/diamond"
      />
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Diamond Face Shape
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Characteristics of a Diamond Face
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              The diamond face shape has distinct angular features with dramatic
              proportions:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Prominent, high cheekbones as the widest part of the face</li>
              <li>Narrow forehead that's not as wide as the cheekbones</li>
              <li>Narrow, sometimes pointed chin</li>
              <li>Angular jawline that tapers to the chin</li>
              <li>Face length is typically longer than width</li>
            </ul>
            <p className="mb-4">
              Diamond faces are characterized by their distinctive bone
              structure and dramatic angles, creating a naturally sculpted
              appearance.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Best Hairstyles for Diamond Faces
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              Ideal hairstyles for diamond faces soften the angles and create
              balance:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Side-swept bangs or wispy fringe to soften the forehead</li>
              <li>
                Styles with volume at the temples to balance narrow forehead
              </li>
              <li>Chin-length or longer cuts that soften the jawline</li>
              <li>Layers around the face that soften angular features</li>
              <li>
                Styles with fullness at the jawline to balance the cheekbones
              </li>
            </ul>
            <p>
              Avoid styles that are too sleek or pulled back, which can
              emphasize angular features.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Eyewear for Diamond Faces
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              The best eyewear choices for diamond faces balance the proportions
              and soften angles:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Frames with detailing or embellishments at the top</li>
              <li>Oval or round frames to soften angular features</li>
              <li>Top-heavy frames that add width to the forehead</li>
              <li>Cat-eye styles that complement the high cheekbones</li>
              <li>Rimless or semi-rimless frames for a subtle look</li>
            </ul>
            <p>
              Avoid narrow or angular frames that can emphasize the sharpness of
              features.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Makeup Tips for Diamond Faces
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
            <p className="mb-4">
              Makeup can help balance and soften the distinctive angles of a
              diamond face:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                Highlight the center of the forehead to create the illusion of
                width
              </li>
              <li>
                Apply blush under the cheekbones rather than directly on them
              </li>
              <li>Use highlighter on the chin to soften and round it</li>
              <li>
                Contour the sides of the cheeks to minimize width at the
                cheekbones
              </li>
              <li>Use rounded, soft brow shapes rather than angular arches</li>
            </ul>
          </div>
        </section>

        <FaceShapeDetectionCTA faceShape="diamond" />

        <FaceShapeLinks currentShape="diamond" />
      </article>
    </>
  );
};

export default DiamondFace;
