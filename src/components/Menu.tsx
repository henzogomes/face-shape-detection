//src/components/Menu.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <nav>
      <ul className="flex space-x-6">
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
            to="/face-shapes"
            className={`transition-colors duration-200 ${
              isActive("/face-shapes")
                ? "text-blue-400 font-semibold"
                : "hover:text-gray-300"
            }`}
          >
            Face Shapes
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
