import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticate } = useSelector((store) => store.auth);
  console.log(isAuthenticate);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticate) {
      navigate("/login");
    }
  }, [isAuthenticate, navigate]);


  return isAuthenticate ? children : null;
};

export default UserPrivateRoute;
