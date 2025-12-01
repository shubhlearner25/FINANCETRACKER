import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [queuedToast, setQueuedToast] = useState(null);

  /** ----------------------------------------
   *  Validate token on first load
   * ---------------------------------------*/
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
          setToken(savedToken);
        } catch (err) {
          console.warn("Invalid token, clearing storage.");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /** ----------------------------------------
   * Trigger toast AFTER we navigate
   * ---------------------------------------*/
  useEffect(() => {
    if (queuedToast) {
      toast[queuedToast.type](queuedToast.message);
      setQueuedToast(null);
    }
  }, [queuedToast]);

  /** ----------------------------------------
   * Login handler
   * ---------------------------------------*/
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { token: accessToken, ...userDetails } = res.data;

      // Save token
      localStorage.setItem("token", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setToken(accessToken);
      setUser(userDetails);

      setQueuedToast({
        type: "success",
        message: "Logged in successfully!",
      });

      // First time user → go to setup
      if (!userDetails.isSetupComplete) {
        navigate("/setup");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Unable to login. Please try again.";
      setQueuedToast({ type: "error", message: msg });
      throw new Error(msg);
    }
  };

  /** ----------------------------------------
   * Signup handler
   * ---------------------------------------*/
  const signup = async (email, password) => {
    try {
      const res = await api.post("/auth/signup", { email, password });

      const { token: accessToken, ...userDetails } = res.data;

      localStorage.setItem("token", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      setToken(accessToken);
      setUser(userDetails);

      setQueuedToast({
        type: "success",
        message: "Signup successful!",
      });

      navigate("/setup");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Signup failed. Please try again.";
      setQueuedToast({ type: "error", message: msg });
      throw new Error(msg);
    }
  };

  /** ----------------------------------------
   * Logout
   * ---------------------------------------*/
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];

    setUser(null);
    setToken(null);

    setQueuedToast({
      type: "info",
      message: "You have been logged out.",
    });

    navigate("/login");
  };

  /** ----------------------------------------
   * Setup onboarding (currency selection)
   * ---------------------------------------*/
  const setup = async (defaultCurrency) => {
    try {
      const res = await api.put("/auth/setup", { defaultCurrency });
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Setup failed. Please try again later.";
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        setup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
