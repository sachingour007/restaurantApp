import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userDetails = localStorage.getItem("userDetailes");
  console.log(userDetails);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userDetails) {
      navigate("/login");
    }
  }, [userDetails, navigate]);

  return userDetails ? children : null;
};

export default UserPrivateRoute;
