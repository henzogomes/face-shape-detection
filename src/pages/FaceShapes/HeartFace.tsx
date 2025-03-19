import React from "react";
import SEO from "../../components/SEO";
import FaceShapeLinks from "../../components/FaceShapeLinks";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaceShapeDetectionCTA from "../../components/FaceShapeDetectionCTA";

const HeartFace: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Face Shapes", path: "/face-shapes" },
    { label: "Heart" },
  ];

  return (
    <>
      <SEO
        title="Heart Face Shape Guide"
        description="Learn about heart face shape characteristics, best hairstyles, glasses, and makeup recommendations for heart-shaped faces."
        keywords="heart face shape, heart shaped face hairstyles, glasses for heart face, heart face makeup"
        path="/face-shapes/heart"
      />
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-6">Heart Face Shape</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Characteristics of a Heart Face
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              The heart face shape is characterized by its distinctive top-heavy
              appearance:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Wider forehead that tapers to a narrower chin</li>
              <li>High, sometimes prominent cheekbones</li>
              <li>Narrow, sometimes pointed chin</li>
              <li>Often a widow's peak at the hairline</li>
              <li>Face resembles an inverted triangle</li>
            </ul>
            <p className="mb-4">
              Heart-shaped faces have a naturally feminine, delicate appearance
              with their tapered chin and wider upper face.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Best Hairstyles for Heart Faces
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Ideal hairstyles for heart-shaped faces balance the wider forehead
              with the narrower chin:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Side-swept bangs to minimize forehead width</li>
              <li>
                Chin-length or longer styles that add width at the jawline
              </li>
              <li>Layered cuts that add volume around the jawline and chin</li>
              <li>
                Medium to long styles with waves or curls to balance proportions
              </li>
              <li>Pixie cuts with longer, textured tops and fuller sides</li>
            </ul>
            <p>
              Avoid styles that add too much height or volume at the crown,
              which can emphasize the width of the forehead.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Eyewear for Heart Faces
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              The best eyewear for heart-shaped faces balances the proportions
              and draws attention away from the forehead:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Bottom-heavy frames to balance the wider forehead</li>
              <li>Light-colored or rimless frames at the top</li>
              <li>Oval or round frames to soften angles</li>
              <li>Cat-eye shapes with thinner top frames</li>
              <li>Rectangular frames with rounded edges</li>
            </ul>
            <p>
              Avoid top-heavy frames or styles that draw attention to the
              forehead.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Makeup Tips for Heart Faces
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Makeup can help balance the proportions of a heart-shaped face:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Use contour along the temples and sides of the forehead</li>
              <li>Apply blush in a horizontal sweep across the cheekbones</li>
              <li>Highlight the center of the chin to bring it forward</li>
              <li>Define the jawline with subtle contour to create width</li>
              <li>
                Keep brows well-groomed but not too heavy to avoid emphasizing
                the forehead
              </li>
            </ul>
          </div>
        </section>

        <FaceShapeDetectionCTA faceShape="heart" />

        <FaceShapeLinks currentShape="heart" />
      </article>
    </>
  );
};

export default HeartFace;
