import React, { useEffect } from "react";
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
  const { success, user, error } = useSelector((store) => store.auth);
  console.log("User", user);
  console.log("error", error);
  console.log("succes", success);

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        dispatch(registerUser(values));
        action.resetForm();
      },
    });

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
