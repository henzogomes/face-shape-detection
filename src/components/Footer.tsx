//src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { APP_DESCRIPTION, APP_ICON, APP_NAME } from "../Constants";
import Menu from "./Menu";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-800 text-white mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
            >
              {APP_ICON} {APP_NAME}
            </Link>
            <p className="mt-2 text-gray-400 dark:text-gray-500">
              {APP_DESCRIPTION}
            </p>
          </div>

          {/* Copyright */}
          <div>
            <p className="text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-300">
              Navigation
            </h3>
            <Menu />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
