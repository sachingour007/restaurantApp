const express = require("express");
const router = express.Router();
const {
  registerController,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/form.middleware.js");
const registerSchema = require("../vaildators/auth-vaildators.js");

router.route("/register").post(validate(registerSchema), registerController);
router.route("/login").post(loginUser);

//Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);

module.exports = router;
