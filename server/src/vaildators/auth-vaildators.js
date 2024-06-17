const { z } = require("zod");

//Creating an Object Schema for Zod

const registerSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .nonempty({ message: "username is required" })
    .trim()
    .min(3, { message: "username must be at least of 3 chars." })
    .max(20, { message: "username must not be more than 20 chars" }),
  email: z
    .string({ required_error: "email is required" })
    .nonempty({ message: "username is required" })
    .trim(),
  fullName: z
    .string({ required_error: "fullName is required" })
    .nonempty({ message: "fullName is required" })
    .trim()
    .min(3, { message: "fullName must be at least of 3 chars." })
    .max(100, { message: "fullName must not be more than 100 chars" }),
  password: z
    .string({ required_error: "password is required" })
    .nonempty({ message: "password is required" })
    .trim()
    .min(6, { message: "password must be at least of 6 chars." })
    .max(16, { message: "password can't be greater than 16 chars" }),
  phone: z
    .string({ required_error: "phone is required" })
    .nonempty({ message: "phone is required" })
    .trim()
    .min(10, { message: "phone must be at least of 10 chars." })
    .max(12, { message: "phone must not be more than 12 chars" }),
});

module.exports = registerSchema;
