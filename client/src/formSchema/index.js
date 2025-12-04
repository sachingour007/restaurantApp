import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string().min(3).max(25).required("Please enter your FullName"),
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(3).max(16).required("Please enter your Password"),
  phone: Yup.string().min(10).max(12).required("Please enter your Phone"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(3).max(16).required("Please enter your Password"),
});
