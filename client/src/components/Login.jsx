import React, { useState, useEffect } from "react";
import login_bg from "../assets/images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticate } = useSelector((store) => store.auth);

  console.log(isAuthenticate);
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(loginFormData));
      setLoginFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.error("login failed:", error);
    }
  };

  return (
    <section className="loginSection">
      <div className="wrapper">
        <div className="imgContainer">
          <img src={login_bg} alt="" />
        </div>
        <div className="formContainer">
          <h2>
            Log In <span>HotCorner !!</span>
          </h2>
          <form action="" onSubmit={submitHandler}>
            <div className="inputContainer">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" Enter Email..."
                value={loginFormData.email}
                onChange={loginHandler}
                required
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password..."
                value={loginFormData.password}
                onChange={loginHandler}
                required
              />
            </div>
            <input type="submit" value="Login" />
          </form>
          <div className="signUpNote">
            <p>
              Don't Have An Account? <Link to={"/register"}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
