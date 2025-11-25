const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { userAuth } = require("../middleware/authMiddleware");
const { ApiResponse } = require("../utils/ApiResponse");
const User = require("../models/userModel");
const userRouter = express.Router();

userRouter.get(
	"/profile",
	userAuth,
	asyncHandler(async (req, res) => {
		const user = await User.findById(req.user.id).select(
			"-isAdmin -password"
		);

		if (!user) {
			return next(new ApiError(404, "User not found"));
		}

		return res
			.status(200)
			.json(new ApiResponse(200, user, "User Data Retrieved Successfully"));
	})
);

module.exports = { userRouter };
