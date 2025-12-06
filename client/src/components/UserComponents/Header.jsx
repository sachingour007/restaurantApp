import react, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faX,
  faBarsStaggered,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../../store/userSlice";
import { BASE_URL } from "../../constantFiles/baseURL";

const Header = () => {
  const userDetails = useSelector((store) => store.user);
  const [navVisible, setNavVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const logoutUser = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login", { replace: true });
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
          <NavLink to={"/about"}>
            <li>About</li>
          </NavLink>
          <NavLink to={"/book-table"}>
            <li>Book Table</li>
          </NavLink>
        </ul>
      </div>

      <div className="user-items">
        <ul>
          {userDetails ? (
            <NavLink>
              <li className="user-icon" onClick={logOutHandler}>
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

          {userDetails ? (
            <li className="user-name">Hi, {userDetails.fullName}</li>
          ) : (
            ""
          )}
          {userDetails && (
            <NavLink>
              <li className="order-online">Cart</li>
            </NavLink>
          )}
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
              <NavLink to={"/"}>
                <li onClick={() => setNavVisible(false)}>Home</li>
              </NavLink>
              <NavLink to={"/menu"}>
                <li onClick={() => setNavVisible(false)}>Menu</li>
              </NavLink>
              <NavLink to={"/about"}>
                <li onClick={() => setNavVisible(false)}>About</li>
              </NavLink>
              <NavLink to={"/book-table"}>
                <li onClick={() => setNavVisible(false)}>Book Table</li>
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
