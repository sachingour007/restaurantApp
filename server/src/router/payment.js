const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { userAuth } = require("../middleware/authMiddleware");
const paymentRouter = express.Router();
const instance = require("../utils/razorpay");
const { ApiResponse } = require("../utils/ApiResponse");
const Cart = require("../models/cartModel");
const { ApiError } = require("../utils/ApiError");
const Payment = require("../models/paymentModel");

paymentRouter.post(
	"/payment/create",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const { _id, fullName, email, phone } = req.user;
		const { cartId } = req.body;

		const cart = await Cart.findOne({ _id: cartId });
		if (!cart) {
			return new ApiError(400, "Cart not found");
		}

		const order = await instance.orders.create({
			amount: Math.round(Number(cart.totalPrice.toFixed(2)) * 100),
			currency: "INR",
			receipt: "order_rcptid_01",
			notes: {
				fullName,
				email,
				phone,
			},
		});

		//Save Order in DB
		const payment = new Payment({
			userId: _id,
			orderId: order.id,
			status: order.status,
			amount: order.amount,
			currency: order.currency,
			receipt: order.receipt,
			notes: order.notes,
		});

		const savedPayment = await payment.save();

		//Return the response to Frontend

		res.status(200).json(new ApiResponse(200, payment, "Order Created."));
	})
);

module.exports = { paymentRouter };
