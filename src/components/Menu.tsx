//src/components/Menu.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/"
            className={`transition-colors duration-200 ${
              location.pathname === "/"
                ? "text-blue-400 font-semibold"
                : "hover:text-gray-300"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/detect"
            className={`transition-colors duration-200 ${
              location.pathname === "/detect"
                ? "text-blue-400 font-semibold"
                : "hover:text-gray-300"
            }`}
          >
            Detect
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`transition-colors duration-200 ${
              location.pathname === "/about"
                ? "text-blue-400 font-semibold"
                : "hover:text-gray-300"
            }`}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
