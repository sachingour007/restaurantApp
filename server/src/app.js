const express = require("express");
const app = express();
const cors = require("cors");
const cockieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //Json Handle with Body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Json Handle with URL
app.use(express.static("public")); //use for static items
app.use(cockieParser()); //Server to user's Browser cookies access for tokens

module.exports = app;
