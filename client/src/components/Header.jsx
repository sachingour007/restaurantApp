import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faX,
  faBarsStaggered,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

const Header = () => {
  const [navVisible, setNavVisible] = useState(false);
  const { isAuthenticate, user } = useSelector((store) => store.auth);
  console.log("isAuthenticate", isAuthenticate);
  console.log("user", user);
  const dispatch = useDispatch();
  const userDetails = localStorage.getItem("userDetailes");
  const singleUser = JSON.parse(userDetails);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const result = await dispatch(logoutUser());
      console.log("result", result);
      if (result.payload.success) {
        navigate("/login");
      } else {
        console.error("Logout failed", result.payload.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <div className="logoName">
        <NavLink to={"/"}>
          <span>Hot Cornor</span>
        </NavLink>
      </div>
      <div className="navbar-link">
        <ul>
          <NavLink to={"/"}>
            <li>Home</li>
          </NavLink>
          <NavLink to={"/menu"}>
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
          {singleUser ? (
            <NavLink>
              <li className="user-icon" onClick={logoutHandler}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </li>
            </NavLink>
          ) : (
            <NavLink to={"/login"}>
              <li className="user-icon">
                <FontAwesomeIcon icon={faUser} />
              </li>
            </NavLink>
          )}

          {singleUser ? (
            <li className="user-name">{singleUser?.fullName}</li>
          ) : (
            ""
          )}

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
