const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { userAuth } = require("../middleware/authMiddleware");
const paymentRouter = express.Router();
const instance = require("../utils/razorpay");
const { ApiResponse } = require("../utils/ApiResponse");

paymentRouter.post(
	"/payment/create",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const order = await instance.orders.create({
			amount: 50000,
			currency: "INR",
			receipt: "order_rcptid_11",
			notes: {
				firstName: "sachin",
				lastName: "gour",
			},
		});

		//Save Order in DB

		//Return the response to Frontend

		res.status(200).json(new ApiResponse(200, order, "Order Created."));
	})
);

module.exports = { paymentRouter };
