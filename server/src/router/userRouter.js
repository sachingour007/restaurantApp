const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { userAuth } = require("../middleware/authMiddleware");
const { ApiResponse } = require("../utils/ApiResponse");
const userRouter = express.Router();

userRouter.get(
	"/profile",
	userAuth,
	asyncHandler(async (req, res) => {
		return res
			.status(200)
			.json(
				new ApiResponse(200, req.user, "User Data Retrieved Successfully")
			);
	})
);

module.exports = { userRouter };
