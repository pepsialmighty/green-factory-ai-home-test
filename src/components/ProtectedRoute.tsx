import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Checks if the user is authenticated
// If not, redirects to the login page

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectPath,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
