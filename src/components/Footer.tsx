import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white w-full fixed bottom-0">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold text-lg">My Face Shape Detector</h3>
            <p className="text-sm text-gray-300">
              Your AI-powered face shape analysis tool
            </p>
          </div>

          <div className="text-center">
            <p>&copy; {currentYear} All rights reserved</p>
          </div>

          <div className="flex flex-col items-end">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
