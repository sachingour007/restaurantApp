import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul>
        <NavLink to={"/admin/users"}>
          <li>User</li>
        </NavLink>
        <NavLink to={"/admin/menu"}>
          <li>Menu</li>
        </NavLink>
        <NavLink to={"/booktable"}>
          <li>Book Table</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default AdminNav;
