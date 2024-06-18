import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string().min(3).max(25).required("Please enter your FullName"),
  username: Yup.string().min(3).max(25).required("Please enter your Username"),
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(3).max(16).required("Please enter your Password"),
  phone: Yup.string().min(10).max(12).required("Please enter your Phone"),
});
