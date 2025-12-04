import React from "react";
import { Header, Footer } from "../index";
import { Outlet } from "react-router-dom";

function UserMain() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserMain;
