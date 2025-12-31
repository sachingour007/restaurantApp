const express = require("express");
const User = require("../models/userModel");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");

authRouter.post(
	"/signup",
	asyncHandler(async (req, res, next) => {
		const { fullName, email, password, phone } = req.body;

		if (!fullName || !email || !password || !phone) {
			return next(new ApiError(401, "All fields required"));
		}

		const userDetails = await User.findOne({ email });
		if (userDetails) {
			return next(new ApiError(401, "Email already registered"));
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({ fullName, email, password: hashPassword, phone });

		await user.save();

		const token = await user.getJwt();
		res.cookie("token", token, {
			secure: true,
			httpOnly: true,
			sameSite: "none",
			expires: new Date(Date.now() + 24 * 3600000),
		});

		user.password = undefined;
		res.status(200).json(new ApiResponse(200, user, "Signup succesfully"));
	})
);

authRouter.post(
	"/login",
	asyncHandler(async (req, res, next) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new ApiError(401, "All fields required"));
		}

		const userDetails = await User.findOne({ email });
		if (!userDetails) {
			return next(new ApiError(401, "Invalid Email or Password"));
		}

		const passwordChecking = await userDetails.isPasswordValid(password);

		if (!passwordChecking) {
			return next(new ApiError(401, "Invalid Email or Password"));
		}

		const token = await userDetails.getJwt();
		res.cookie("token", token, {
			secure: true,
			httpOnly: true,
			sameSite: "none",
			expires: new Date(Date.now() + 24 * 3600000),
		});

		userDetails.password = undefined;

		res.status(200).json(
			new ApiResponse(200, userDetails, "login Succesfully")
		);
	})
);

authRouter.post(
	"/logout",
	asyncHandler(async (req, res, next) => {
		res.clearCookie("token", {
			httpOnly: true,
			secure: true,
		});
		res.status(200).json(new ApiResponse(200, "", "User logout successful!"));
	})
);
module.exports = { authRouter };
