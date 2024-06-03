import React, { useState } from "react";
import login_banner from "../assets/images/login_banner.png";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const Register = () => {
  const [resigterData, setRegisterData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const formhandler = (e) => {
    setRegisterData({ ...resigterData, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(resigterData),
      });
      const retrn_response = await response.json();
      console.log(retrn_response);

      if (response.ok) {
        setRegisterData({
          fullname: "",
          username: "",
          email: "",
          password: "",
          phone: "",
        });
      }
    } catch (error) {
      console.log("resiter page", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser();
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
              name="fullname"
              id="fullname"
              placeholder="Enter FullName..."
              value={resigterData.fullname}
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
