import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

/**
 * A simple wrapper hook that exposes values from the AuthContext.
 * Keeps components cleaner and ensures consistent usage.
 */
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
