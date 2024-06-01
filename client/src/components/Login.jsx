import React from "react";
import login_bg from "../assets/images/login_bg.jpg";
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <section className="loginSection">
      <div className="wrapper">
        <div className="imgContainer">
          <img src={login_bg} alt="" />
        </div>
        <div className="formContainer">
          <h2>
            Welcome to <span>HotCorner !!</span>
          </h2>
          <form action="">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <input type="submit" value="Login" />
          </form>
          <div className="signUpNote">
          <p>Alreay Have An Account? <Link>Sign Up</Link></p>
        </div>
        </div>
        
      </div>
    </section>
  );
};

export default Login;
