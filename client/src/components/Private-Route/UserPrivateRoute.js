import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

const UserPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = cookies.get("accessToken");
  const isAuth = !!token;
  console.log(isAuth);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return isAuth ? children : null;
};

export default UserPrivateRoute;
