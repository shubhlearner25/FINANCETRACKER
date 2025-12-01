import React from "react";
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch theme"
      className="
        p-2 rounded-full
        text-orange-500 dark:text-orange-300
        hover:bg-orange-100 dark:hover:bg-orange-800
        transition duration-300
      "
    >
      {isLight ? (
        // Moon Icon → Switch to Dark Mode
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="
              M20.354 15.354
              A9 9 0 018.646 3.646
              9.003 9.003 0 0012 21
              a9.003 9.003 0 008.354-5.646z
            "
          />
        </svg>
      ) : (
        // Sun Icon → Switch to Light Mode
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="
              M12 3v1m0 16v1
              m9-9h-1M4 12H3
              m15.364 6.364l-.707-.707
              M6.343 6.343l-.707-.707
              m12.728 0l-.707.707
              M6.343 17.657l-.707.707
              M16 12a4 4 0 11-8 0 4 4 0 018 0z
            "
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
