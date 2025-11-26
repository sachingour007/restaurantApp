const express = require("express");
const menuRouter = express.Router();
const { userAuth } = require("../middleware/authMiddleware.js");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError.js");
const Menu = require("../models/menuModel.js");
const { isAdminMiddleware } = require("../middleware/isAdminMiddleware.js");
const { default: mongoose } = require("mongoose");
const { isValidateUpdateData } = require("../utils/validate.js");

/* Add Food API */
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

/* Menu Get API */
menuRouter.get(
	"/",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const allMenu = await Menu.find();
		res.status(200).json(
			new ApiResponse(200, allMenu, "Menu fetched successfully")
		);
	})
);

/*Update Menu Api */

menuRouter.patch(
	"/foodUpdate/:id",
	userAuth,
	isAdminMiddleware,
	asyncHandler(async (req, res, next) => {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(new ApiError(400, "Invalid Menu ID"));
		}

		if (!isValidateUpdateData(req)) {
			return next(new ApiError(400, "Invalid Edit Request"));
		}

		const updateFieldData = {};
		Object.keys(req.body).forEach(
			(key) => (updateFieldData[key] = req.body[key])
		);

		if (updateFieldData.price && isNaN(Number(updateFieldData.price))) {
			return next(new ApiError(400, "price must be a number"));
		}

		const updatedMenu = await Menu.findByIdAndUpdate(id, updateFieldData, {
			new: true,
		});

		if (!updatedMenu) {
			return next(new ApiError(404, "Menu item not found"));
		}

		res.status(400).json(
			new ApiResponse(200, updatedMenu, "Menu Update successFully!")
		);
	})
);

/* Update Offer API */
menuRouter.patch(
	"/updateOffer/:id",
	userAuth,
	isAdminMiddleware,
	asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const { discount, discountTitle, discountTagline } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(new ApiError(400, "Invalid Menu ID"));
		}

		if (discount && isNaN(Number(discount))) {
			return next(new ApiError(400, "Discount must be a number"));
		}

		const updateSingleMenuItem = await Menu.findByIdAndUpdate(
			id,
			{
				discount: discount || 0,
				discountTitle: discountTitle || "",
				discountTagline: discountTagline || "",
			},
			{ new: true }
		);

		if (!updateSingleMenuItem) {
			return next(new ApiError(404, "Menu item not found"));
		}
		return res
			.status(200)
			.json(new ApiResponse(200, updateSingleMenuItem, "Offer updated"));
	})
);

/*Food item Delete */



module.exports = { menuRouter };
