// src/components/Results.tsx
import React from "react";
import ProgressBars from "./ProgressBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler, faRulerHorizontal } from "@fortawesome/free-solid-svg-icons";

interface ResultsProps {
  faceShape: string;
  faceLength: string;
  faceWidth: string;
  jawlineWidth: string;
  probabilities: { [key: string]: number };
  isProcessing: boolean;
  showMeasurements: boolean;
  toggleMeasurements: () => void;
}

const Results: React.FC<ResultsProps> = ({
  faceShape,
  faceLength,
  faceWidth,
  jawlineWidth,
  probabilities,
  isProcessing,
  showMeasurements,
  toggleMeasurements,
}) => {
  return (
    <section className="mt-5 text-left">
      <h2 className="text-xl font-bold mb-4">Your Face Analysis</h2>

      <article className="bg-white p-5 rounded-lg shadow">
        {/* Main Result */}
        <header className="mb-4">
          <h3 className="text-2xl font-bold text-orange-600 mb-2 inline">
            Face type:
            <span className="text-2xl font-bold uppercase text-black">
              {" "}
              {faceShape}
            </span>
          </h3>
        </header>

        {/* Probabilities Section */}
        <section>
          <ProgressBars probabilities={probabilities} />
        </section>

        {/* Measurements Section */}
        <section>
          <h3 className="text-lg font-bold mb-2 mt-10">Measurements</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm">Face Length</p>
              <p className="font-medium">{faceLength}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Face Width</p>
              <p className="font-medium">{faceWidth}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Jawline Width</p>
              <p className="font-medium">{jawlineWidth}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Ratio (L:W)</p>
              <p className="font-medium">
                {faceLength !== "-" && faceWidth !== "-"
                  ? (Number(faceLength) / Number(faceWidth)).toFixed(2)
                  : "-"}
              </p>
            </div>

            {/* Measurement control button - only shown when we have results */}
            {faceShape !== "-" && (
              <div className="mb-4">
                <button
                  onClick={toggleMeasurements}
                  className="bg-white text-black border border-black hover:bg-gray-100 font-bold py-1 px-3 rounded text-sm flex items-center gap-2"
                  aria-pressed={showMeasurements}
                >
                  <FontAwesomeIcon
                    icon={showMeasurements ? faRulerHorizontal : faRuler}
                    aria-hidden="true"
                  />
                  {showMeasurements ? "Hide Measurements" : "Show Measurements"}
                </button>
              </div>
            )}
          </div>
        </section>
      </article>
    </section>
  );
};

export default Results;
