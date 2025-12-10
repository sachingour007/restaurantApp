import React, { useState, useEffect } from "react";
import login_bg from "../../assets/images/login_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constantFiles/baseURL.js";
import { Formik, useFormik } from "formik";
import { loginSchema } from "../../formSchema/index.js";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice.js";
import { toast } from "react-toastify";

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
      return userData;
    } catch (error) {
      throw error.response?.data?.message || "Server Error!";
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const result = await loginHandler(values);
          dispatch(addUser(result.data.data));
          navigate("/");
          action.resetForm();
          toast.success("Login SuccessFully.");
        } catch (error) {
          toast.error(error);
        }
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
