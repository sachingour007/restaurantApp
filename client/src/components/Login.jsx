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

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate]);

  const loginHandler = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginFormData));
    setLoginFormData({
      email: "",
      password: "",
    });
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
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" Enter Email..."
              value={loginFormData.email}
              onChange={loginHandler}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password..."
              value={loginFormData.password}
              onChange={loginHandler}
              required
            />
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
