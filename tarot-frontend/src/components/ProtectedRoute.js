import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, isAuthenticated } = useAuth();
  const { username } = useParams();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (user.username !== username) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
