import react, { useEffect, useState } from "react";
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
import { clearBookings } from "../../store/tableBookingSlice";
import { BASE_URL } from "../../constantFiles/baseURL";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((store) => store.user);
  const [navVisible, setNavVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameShort = user?.fullName?.split(" ");

  const logOutHandler = async () => {
    try {
      const logoutUser = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(clearBookings());
      navigate("/login", { replace: true });
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (navVisible && window.innerWidth <= 820) {
      document.body.classList.add("hideScrollbar");
      document.documentElement.classList.add("hideScrollbarhtml");
    } else {
      document.body.classList.remove("hideScrollbar");
      document.documentElement.classList.remove("hideScrollbarhtml");
    }
  }, [navVisible]);

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
          {user ? (
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

          {user ? <li className="user-name">Hi, {nameShort[0]}</li> : ""}
          {user && (
            <NavLink to={"/cart"}>
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
              {user ? <li className="user-name">Hi, {nameShort[0]}</li> : ""}
              {user && (
                <NavLink>
                  <li className="order-online">Cart</li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
