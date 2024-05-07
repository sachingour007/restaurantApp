import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faX,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <div className="logoName">
        <NavLink to={"/"}>
          <span>Hot Cornor</span>
        </NavLink>
      </div>
      <div className="navbar-link">
        <ul>
          <NavLink>
            <li>Home</li>
          </NavLink>
          <NavLink>
            <li>Menu</li>
          </NavLink>
          <NavLink>
            <li>About</li>
          </NavLink>
          <NavLink>
            <li>Book Table</li>
          </NavLink>
        </ul>
      </div>
      <div className="user-items">
        <ul>
          <NavLink>
            <li className="user-icon">
              <FontAwesomeIcon icon={faUser} />
            </li>
          </NavLink>
          <NavLink>
            <li className="cart-icon">
              <FontAwesomeIcon icon={faCartShopping} />
            </li>
          </NavLink>
          <NavLink>
            <li className="order-online">Order Online</li>
          </NavLink>
        </ul>
      </div>

      <div>
        <FontAwesomeIcon icon={faX} />
        <FontAwesomeIcon icon={faBarsStaggered} />
      </div>
    </header>
  );
};

export default Header;
