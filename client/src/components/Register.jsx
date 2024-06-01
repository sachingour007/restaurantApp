import React from "react";
import login_banner from "../assets/images/login_banner.png";
import { Link } from "react-router-dom";

const Register = () => {
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
              name="email"
              id="username"
              placeholder="Enter Username..."
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email..."
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password..."
              required
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter Phone No..."
              required
            />
            <input type="submit" value="Sign Up" />
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
