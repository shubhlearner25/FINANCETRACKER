import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

/**
 * Small helper hook that exposes the theme state and toggle function.
 * Simply returns whatever the ThemeContext provides.
 */
const useTheme = () => {
  const themeValue = useContext(ThemeContext);
  return themeValue;
};

export default useTheme;
