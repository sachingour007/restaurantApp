import React, { useState, useEffect } from "react";
import login_banner from "../assets/images/login_banner.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useFormik } from "formik";
import { registerSchema } from "../formSchema/index.js";

const initialValues = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticate, user, error } = useSelector((store) => store.auth);
  console.log("User", user);
  console.log("error", error);

  const navigate = useNavigate();
  // const [resigterData, setRegisterData] = useState({
  //   fullName: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  // });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        dispatch(registerUser(values));
        console.log(values);
        action.resetForm();
        navigate("/login");
      },
    });
  console.log(errors);

  // const formhandler = (e) => {
  //   setRegisterData({ ...resigterData, [e.target.name]: e.target.value });
  // };

  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //   }
  // }, [error]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const { username, fullName, email, password, phone } = resigterData;
  //   if (username && fullName && email && password && phone) {
  //     dispatch(registerUser(resigterData));
  //     if (!error) {
  //       setRegisterData({
  //         fullName: "",
  //         username: "",
  //         email: "",
  //         password: "",
  //         phone: "",
  //       });
  //       navigate("/login");
  //     }

  //     console.log("true");
  //   } else {
  //     console.log("false values");
  //   }
  // };

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
          <form action="" onSubmit={handleSubmit}>
            <div className="inputContainer">
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter fullName..."
                value={values.fullName}
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.fullName && touched.fullName ? (
                <p>{errors.fullName}</p>
              ) : null}
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username..."
                value={values.username}
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <p>{errors.username}</p>
              ) : null}
            </div>
            <div className="inputContainer">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email..."
                value={values.email}
                required
                onChange={handleChange}
                onBlur={handleBlur}
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
                required
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter Phone No..."
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone ? <p>{errors.phone}</p> : null}
            </div>
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
