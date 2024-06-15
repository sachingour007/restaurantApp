import React, { useState, useEffect } from "react";
import login_banner from "../assets/images/login_banner.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticate } = useSelector((store) => store.auth);
  console.log(isAuthenticate);

  const navigate = useNavigate();
  const [resigterData, setRegisterData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/login");
    }
  }, [isAuthenticate]);

  const formhandler = (e) => {
    setRegisterData({ ...resigterData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(resigterData));
      setRegisterData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <section className="loginSection register">
      <div className="wrapper">
        <div className="imgContainer">
          <img src={login_banner} alt="" />
        </div>
        <div className="formContainer">
          <h2>
            Welcome to <span>HotCorner !!</span>
          </h2>
          <form action="">
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter fullName..."
              value={resigterData.fullName}
              required
              onChange={formhandler}
            />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username..."
              value={resigterData.username}
              required
              onChange={formhandler}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email..."
              value={resigterData.email}
              required
              onChange={formhandler}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password..."
              value={resigterData.password}
              required
              onChange={formhandler}
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter Phone No..."
              value={resigterData.phone}
              onChange={formhandler}
            />
            <input type="submit" value="Sign Up" onClick={submitHandler} />
          </form>
          <div className="signUpNote">
            <p>
              Already Have An Account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
