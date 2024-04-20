const express = require("express");
const router = express.Router();
const {
  registerController,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/register").post(registerController);
router.route("/login").post(loginUser);

//Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);

module.exports = router;
