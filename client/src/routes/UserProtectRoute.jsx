import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectRoute = ({ children }) => {
  const { user, loading } = useSelector((store) => store.user);
  if (loading) {
    return <div>loading...</div>;
  }

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default UserProtectRoute;
