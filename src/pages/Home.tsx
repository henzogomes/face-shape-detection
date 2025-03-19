//src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_ICON, defaultStructuredData } from "../Constants";
import { ANALYTICS_EVENTS } from "../utils/Events";
import { useAnalytics } from "../hooks/useAnalytics";
import SEO from "../components/SEO";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  const trackDetectButtonClick = () => {
    trackEvent(
      ANALYTICS_EVENTS.DETECT_BUTTON.name,
      ANALYTICS_EVENTS.DETECT_BUTTON.properties
    );
  };

  defaultStructuredData["@type"] = "WebSite";

  return (
    <>
      <SEO
        title="Face Shape Detection"
        description="Upload your photo and discover your face shape with our AI tool."
        path="/"
        structuredData={defaultStructuredData}
      />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Face Shape Detection</h1>
        <button
          onClick={() => {
            trackDetectButtonClick();
            navigate("/detect");
          }}
          className="bg-gray-800 text-white border border-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          {APP_ICON} Let's start!
        </button>
      </div>
    </>
  );
};

export default Home;
