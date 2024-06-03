const express = require("express");
const app = express();
const cors = require("cors");
const cockieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    method: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); //Json Handle with Body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Json Handle with URL
app.use(express.static("public")); //use for static items
app.use(cockieParser()); //Server to user's Browser cookies access for tokens

//Import Routes
const userRoutes = require("./routes/user.routes");

//Define Routes
app.use("/api/v1/auth", userRoutes);

module.exports = app;
