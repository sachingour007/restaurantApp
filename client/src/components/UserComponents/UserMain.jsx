import React from "react";
import { Header, Footer } from "../index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function UserMain() {
  const { user, loading } = useSelector((store) => store.user);

  if (loading) return null;
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserMain;
