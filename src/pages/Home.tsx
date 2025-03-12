//src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_ICON, APP_NAME } from "../Constants";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Face Shape Detector</h1>
      <button
        onClick={() => navigate("/detect")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {APP_ICON} Let's Detect
      </button>
    </div>
  );
};

export default Home;
