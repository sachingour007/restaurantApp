import React, { useState, useEffect } from "react";
import login_bg from "../../assets/images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL.js";
import { Formik, useFormik } from "formik";
import { loginSchema } from "../../formSchema/index.js";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice.js";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (val) => {
    try {
      const userData = await axios.post(`${BASE_URL}/auth/login`, val, {
        withCredentials: true,
      });
      dispatch(addUser(userData.data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        loginHandler(values);
        action.resetForm();
      },
    });

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
          <form action="" onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" Enter Email..."
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password..."
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
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
