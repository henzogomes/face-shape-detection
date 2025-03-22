import React from "react";
import SEO from "../components/SEO";
import { defaultStructuredData } from "../Constants";

const About: React.FC = () => {
  defaultStructuredData["@type"] = "Article";
  return (
    <>
      <SEO
        title="About Face Shape Detection"
        description="Learn how our AI-powered face shape detection tool works and how to interpret your results."
        keywords="face shape technology, AI face detection, about face shape detection"
        path="/about"
        structuredData={defaultStructuredData}
      />
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          About This Tool
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            How It Works
          </h2>
          <div className="prose max-w-none dark:prose-invert">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Face Shape Detector is an AI-powered tool that helps you determine
              your face shape using advanced facial recognition technology.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our application uses machine learning algorithms to analyze facial
              features and provide accurate face shape classifications.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Technology Behind the Tool
          </h2>
          <div className="prose max-w-none dark:prose-invert">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We use MediaPipe's face mesh detection system to identify 468
              facial landmarks. These landmarks help us accurately measure key
              facial dimensions:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
              <li>Face length (forehead to chin)</li>
              <li>Face width (cheek to cheek)</li>
              <li>Jawline width and angle</li>
              <li>Forehead width</li>
            </ul>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              By analyzing these measurements, our algorithm determines which of
              the six common face shapes your features most closely match.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Privacy & Security
          </h2>
          <div className="prose max-w-none dark:prose-invert">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your photos are processed directly in your browser and are never
              uploaded to our servers. We respect your privacy and ensure your
              data remains secure.
            </p>
          </div>
        </section>
      </article>
    </>
  );
};

export default About;
