const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/userModel");

const userAuth = asyncHandler(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(new ApiError(401, "Please Login First!"));
	}

	const decodeUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	const loggedUser = await User.findById(decodeUser._id).select("-password");

	if (!loggedUser) {
		return next(new ApiError(404, "User Does not Exist"));
	}

	req.user = loggedUser;
	next();
});

module.exports = { userAuth };
