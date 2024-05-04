import React from "react";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="logoName">
        <NavLink to={'/'}><span>Hot Cornor</span></NavLink>
      </div>
      <div className="navbar-link">
        <ul>
          <NavLink><li>Home</li></NavLink>
          <NavLink><li>Menu</li></NavLink>
          <NavLink><li>About</li></NavLink>
          <NavLink><li>Book Table</li></NavLink>
        </ul>
      </div>
      <div className="user-items">
        <ul>
            <NavLink><li className="user-icon"><FaUser /></li></NavLink>
            <NavLink><li className="cart-icon"><FaShoppingCart /></li></NavLink>
            <NavLink><li className="order-online">Order Online</li></NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
