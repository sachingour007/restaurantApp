const express = require("express");
const app = express();
const { errorMiddleware } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

//Middleware
app.use(express.json({ limit: "16kb" })); //Json Handle with Body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Json Handle with URL
app.use(express.static("public")); //use for static items
app.use(cookieParser()); //Server to user's Browser cookies access for tokens

// Import Routes
const { authRouter } = require("./router/authRouter");
const { userRouter } = require("./router/userRouter");

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorMiddleware);

module.exports = app;
