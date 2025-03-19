import React from "react";

// Face shape type descriptions
const faceShapeInfo = [
  {
    type: "oblong",
    description:
      "Characterized by a face length noticeably longer than its width, with forehead, cheekbones, and jawline having similar widths throughout.",
  },
  {
    type: "oval",
    description:
      "Features a face that's longer than wide with a gently curved jawline and a forehead slightly wider than the chin, creating balanced proportions.",
  },
  {
    type: "square",
    description:
      "Defined by a strong, angular jawline and forehead that are approximately equal in width, creating a boxier facial structure.",
  },
  {
    type: "round",
    description:
      "Distinguished by soft curves with similar width and length measurements, fuller cheeks, and an absence of sharp angles along the jawline.",
  },
  {
    type: "heart",
    description:
      "Presents with a wider forehead and high cheekbones that taper to a narrow, sometimes pointed chin, resembling an inverted triangle.",
  },
  {
    type: "diamond",
    description:
      "Features prominent cheekbones as the widest point, with both forehead and jawline narrower, and often a defined, pointed chin.",
  },
];

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
        {faceShapeInfo.map((shape) => (
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
              }`}
            >
              {shape.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShapesInfo;
