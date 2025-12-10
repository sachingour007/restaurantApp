import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string().min(3).max(25).required("Please enter your FullName"),
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  phone: Yup.string().min(10).max(10).required("Please enter your Phone"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().min(3).max(16).required("Please enter your Password"),
});

const today = new Date();
today.setHours(0, 0, 0, 0);

export const tableBooSchema = Yup.object({
  fullName: Yup.string().min(3).max(25).required("Please enter your FullName"),
  phone: Yup.string().min(10).max(10).required("Please enter your Phone"),
  email: Yup.string().email().required("Please enter your Email"),
  date: Yup.date()
    .required("Please select a date")
    .min(today, "Past date is not allowed"),
  personCount: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Select number of persons"),
  timeSlot: Yup.string().required("Select a time slot"),
});
