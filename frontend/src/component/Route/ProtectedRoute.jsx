import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return element ? element : <Outlet />;
};

export default ProtectedRoute;
