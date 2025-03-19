import React from "react";
import SEO from "../../components/SEO";
import FaceShapeLinks from "../../components/FaceShapeLinks";
import FaceShapeDetectionCTA from "../../components/FaceShapeDetectionCTA";
import Breadcrumbs from "../../components/Breadcrumbs";

const OblongFace: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Face Shapes", path: "/face-shapes" },
    { label: "Oblong" },
  ];
  return (
    <>
      <SEO
        title="Oblong Face Shape Guide"
        description="Learn about oblong face shape characteristics, best hairstyles, glasses, and makeup recommendations for oblong faces."
        keywords="oblong face shape, rectangular face, oblong face hairstyles, glasses for oblong face, oblong face makeup"
        path="/face-shapes/oblong"
      />
      <article className="max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-6">Oblong Face Shape</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Characteristics of an Oblong Face
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              The oblong face shape (sometimes called rectangular) is
              characterized by its length:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Face length significantly longer than its width</li>
              <li>Forehead, cheekbones, and jawline with similar widths</li>
              <li>Long, straight cheeks</li>
              <li>Often a high forehead</li>
              <li>Typically angular jawline with minimal curve</li>
            </ul>
            <p className="mb-4">
              Oblong faces have elegant proportions with a balanced structure
              from forehead to jawline, though elongated vertically.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Best Hairstyles for Oblong Faces
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Ideal hairstyles for oblong faces create the illusion of width and
              minimize length:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Side-parted styles that add width</li>
              <li>Bangs or fringe to shorten the face visually</li>
              <li>Layered cuts with volume at the sides</li>
              <li>
                Shoulder-length or shorter cuts that don't elongate the face
              </li>
              <li>Waves or curls to add width and fullness</li>
            </ul>
            <p>
              Avoid very long, straight styles or center parts that can make the
              face appear longer.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Eyewear for Oblong Faces
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              The best eyewear choices for oblong faces create balance by adding
              width:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                Wide frames that extend beyond the widest part of the face
              </li>
              <li>Deep lenses that add vertical balance</li>
              <li>Round or square frames with decorative temples</li>
              <li>Oversized frames that add proportion</li>
              <li>Bold, thick frames that create width</li>
            </ul>
            <p>
              Avoid narrow or small frames that can emphasize the length of the
              face.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Makeup Tips for Oblong Faces
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Makeup can help create the illusion of a shorter, wider face:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Apply blush horizontally across the cheeks to add width</li>
              <li>
                Contour the top of the forehead and bottom of the chin to
                shorten
              </li>
              <li>Use highlighter on the cheekbones in a horizontal pattern</li>
              <li>Create fuller, horizontal brows to widen the face</li>
              <li>
                Apply darker foundation at the chin and forehead to reduce
                length
              </li>
            </ul>
          </div>
        </section>

        <FaceShapeDetectionCTA faceShape="oblong" />

        <FaceShapeLinks currentShape="oblong" />
      </article>
    </>
  );
};

export default OblongFace;
