import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminLayout = () => {
  return (
    <section className="adminlayoutSec">
      <div className="wrapperSec">
        <div className="secHeading">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="mainContainer">
          <div className="navLinks">
            <AdminNav />
          </div>
          <div className="mainPages">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
