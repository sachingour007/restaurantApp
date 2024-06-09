import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faX,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Header = () => {
  const [navVisible, setNavVisible] = useState(false);
  const { isAuthenticate } = useSelector((store) => store.auth);

  const userDetails = localStorage.getItem("userDetailes");
  const user = JSON.parse(userDetails);
  console.log(user);

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
          <NavLink to={"/login"}>
            <li className="user-icon">
              <FontAwesomeIcon icon={faUser} />
            </li>
          </NavLink>
          {user ? <li className="cart-icon">{user?.fullName}</li> : ""}

          <NavLink>
            <li className="order-online">Cart</li>
          </NavLink>
        </ul>
      </div>

      <div
        className="hemburgerMenu"
        onClick={() => {
          setNavVisible(!navVisible);
        }}
      >
        {navVisible ? (
          <FontAwesomeIcon icon={faX} />
        ) : (
          <FontAwesomeIcon icon={faBarsStaggered} />
        )}
      </div>
      {navVisible && (
        <div className="mblheaderContainer">
          <div className="mbl-navbar-link">
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
          <div className="mbl-user-items">
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
                <li className="order-online">Cart</li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
