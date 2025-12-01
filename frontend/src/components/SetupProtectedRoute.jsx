import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const SetupProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loader while auth state is being resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  // Redirect guest users to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Force setup completion for first-time users
  if (!user?.isSetupComplete) {
    return <Navigate to="/setup" replace />;
  }

  // Allow route access
  return <div className="w-full h-full">{children}</div>;
};

export default SetupProtectedRoute;
