//src/pages/Home.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ICON, defaultStructuredData } from "../Constants";
import { ANALYTICS_EVENTS } from "../utils/Events";
import { useAnalytics } from "../hooks/useAnalytics";
import SEO from "../components/SEO";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  // Check for dark mode preference when component mounts
  useEffect(() => {
    // This ensures the theme is properly applied when the page loads
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        {/* Add theme switcher in a positioned container */}
        <div className="absolute top-4 right-4">
          <ThemeSwitcher invertColors={true} />
        </div>

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Face Shape Detection
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            Discover your unique face shape using our advanced AI detection
            tool. Upload a photo and get instant results.
          </p>
        </header>

        <button
          onClick={() => {
            trackDetectButtonClick();
            navigate("/detect");
          }}
          className="bg-gray-800 text-white border border-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          {APP_ICON} Let's start!
        </button>

        <section className="mt-8 text-center max-w-lg">
          <p className="text-gray-600 dark:text-gray-400">
            Our AI analyzes facial landmarks to identify your face shape: oval,
            round, square, heart, diamond, or oblong. Get personalized
            recommendations based on your results.
          </p>
        </section>
      </div>
    </>
  );
};

export default Home;
