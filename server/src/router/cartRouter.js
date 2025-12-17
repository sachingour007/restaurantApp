const express = require("express");
const cartRouter = express.Router();
const { userAuth } = require("../middleware/authMiddleware");
const { asyncHandler } = require("../utils/asyncHandler");
const Cart = require("../models/cartModel");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");

/* Cart Initilazie */
cartRouter.post(
	"/cartinit",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user._id;

		const existingCart = await Cart.findOne({ userId });
		if (existingCart) {
			return res
				.status(200)
				.json(new ApiResponse(200, existingCart, "Cart already exists"));
		}

		const newCart = await Cart.create({ userId, item: [] });
		res.status(201).json(new ApiResponse(201, newCart, "Cart created"));
	})
);

/*Cart Item Add */

cartRouter.post(
	"/add",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user._id;
		const { foodId, foodImg, foodName, price } = req.body;

		let cart = await Cart.findOne({ userId });

		if (!cart) {
			cart = await Cart.create({ userId, item: [] });
		}
		const existingItem = cart.item.find(
			(item) => item.foodId.toString() === foodId
		);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.item.push({ foodId, foodImg, foodName, price, quantity: 1 });
		}

		cart.calculateTotals();

		await cart.save();

		res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
	})
);

cartRouter.patch(
	"/update/:foodId",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user._id;
		const foodId = req.params.foodId;
		const { type } = req.body; //"inc" or "dec"

		const cart = await Cart.findOne({ userId });
		const item = cart.item.find((item) => item.foodId.toString() === foodId);

		if (!item) {
			return next(new ApiError(400, "Item not found"));
		}

		if (type === "inc") {
			item.quantity++;
		}
		if (type === "dec") {
			item.quantity--;
		}

		if (item.quantity <= 0) {
			cart.item = cart.item.filter((i) => i.foodId.toString() !== foodId);
		}
		cart.calculateTotals();
		await cart.save();

		res.status(200).json(new ApiResponse(200, cart, "Quantity updated"));
	})
);

/*Remove one food item */

cartRouter.delete(
	"/remove/:foodId",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user._id;
		const foodId = req.params.foodId;

		const cart = await Cart.findOne({ userId });
		cart.item = cart.item.filter((item) => item.foodId !== foodId);

		cart.calculateTotals();
		await cart.save();

		res.status(200).json(new ApiResponse(200, cart, "Item removed"));
	})
);

/* Get cart */

cartRouter.get(
	"/my-cart",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const userId = req.user._id;
		const cart = await Cart.find({ userId });
		res.status(200).json(new ApiResponse(200, cart, "My cart fetched"));
	})
);

module.exports = { cartRouter };
