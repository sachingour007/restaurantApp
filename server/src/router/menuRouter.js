const express = require("express");
const menuRouter = express.Router();
const { userAuth } = require("../middleware/authMiddleware.js");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError.js");
const Menu = require("../models/menuModel.js");
const { isAdminMiddleware } = require("../middleware/isAdminMiddleware.js");

menuRouter.post(
	"/",
	userAuth,
	isAdminMiddleware,
	asyncHandler(async (req, res, next) => {
		const { foodImage, foodName, description, price, category } = req.body;

		if (
			[foodImage, foodName, description, price, category].some(
				(field) => !field
			)
		) {
			return next(new ApiError(400, "Please enter all details"));
		}

		const foodMenu = new Menu({
			foodImage,
			foodName,
			description,
			price,
			category,
		});
		const addedFood = await foodMenu.save();
		res.status(200).json(
			new ApiResponse(200, addedFood, "Food Added Successfully!")
		);
	})
);

menuRouter.get(
	"/",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const allMenu = await Menu.find();
		res.status(200).json(new ApiResponse(200, allMenu, "Menu fetched successfully"));
	})
);

module.exports = { menuRouter };
