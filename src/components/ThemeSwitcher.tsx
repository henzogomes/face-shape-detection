import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface ThemeSwitcherProps {
  invertColors?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  invertColors = false,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage or prefer-color-scheme on initial load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Debug line
    //console.log("Dark mode is:", isDarkMode ? "ON" : "OFF");

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Always show sun icon in dark mode and moon icon in light mode
  // regardless of invertColors prop
  const iconToShow = isDarkMode ? faSun : faMoon;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 ${
        invertColors
          ? "hover:bg-gray-200 dark:hover:bg-gray-700"
          : "hover:bg-gray-700"
      }`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FontAwesomeIcon
        icon={iconToShow}
        className={`text-lg ${
          invertColors ? "text-gray-800 dark:text-gray-200" : ""
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeSwitcher;
