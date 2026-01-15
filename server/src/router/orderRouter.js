const express = require("express");
const { userAuth } = require("../middleware/authMiddleware");
const { asyncHandler } = require("../utils/asyncHandler");
const Order = require("../models/orderModel");
const { ApiResponse } = require("../utils/ApiResponse");
const orderRouter = express.Router();

orderRouter.get(
	"/my-orders",
	userAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user._id;

		const orders = await Order.find({ userId }).sort({ createdAt: -1 });

		res.status(200).json(
			new ApiResponse(200, orders, "Orders fetched successfully")
		);
	})
);

module.exports = orderRouter;
