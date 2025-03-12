//src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { APP_ICON, APP_NAME } from "../Constants";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            {APP_ICON} {APP_NAME}
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
