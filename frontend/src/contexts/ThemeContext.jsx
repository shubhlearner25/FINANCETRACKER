import React, { createContext, useEffect, useState } from "react";
import { updateFavicon } from "../utils/favicon";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Determine initial theme based on localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  /**
   * Apply theme changes to the DOM + persist to localStorage
   */
  useEffect(() => {
    const html = document.documentElement;

    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    // Update favicon color
    updateFavicon(theme);
  }, [theme]);

  /**
   * Flip between light and dark mode
   */
  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
