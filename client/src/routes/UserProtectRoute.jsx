import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (user === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default UserProtectRoute;
