import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import ThemeSwitcher from "./ThemeSwitcher";
import { APP_ICON, APP_NAME } from "../Constants";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white w-full dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            {APP_ICON} {APP_NAME}
          </Link>
          <div className="flex items-center space-x-4">
            <Menu />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
