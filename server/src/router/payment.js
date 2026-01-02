const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { userAuth } = require("../middleware/authMiddleware");
const paymentRouter = express.Router();
const instance = require("../utils/razorpay");
const { ApiResponse } = require("../utils/ApiResponse");
const Cart = require("../models/cartModel");
const { ApiError } = require("../utils/ApiError");
const Payment = require("../models/paymentModel");
const {
	validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

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

		res.status(200).json(
			new ApiResponse(
				200,
				{ savedPayment, keyId: process.env.KEY_ID },
				"Order Created."
			)
		);
	})
);

paymentRouter.post(
	"/payment/webhook",
	asyncHandler(async (req, res, next) => {
		const webhookSignature = req.get("X-Razorpay-Signature");
		const isWebhooksValid = validateWebhookSignature(
			JSON.stringify(req.body),
			webhookSignature,
			process.env.RAZORPAY_WEBHOOKS_SECRET
		);

		if (!isWebhooksValid) {
			return new ApiError(400, "Webhook Signature is invalid");
		}

		const razorpayEvent = req.body.event;
		const razorpayPaymentDetails = req.body.payload.payment.entity;

		const paymentDBDetails = await Payment.findOne({
			orderId: paymentEntity.order_id,
		});

		if (!paymentDBDetails) {
			return new ApiError(400, "Payment Detail not found");
		}

		if (razorpayEvent === "payment.captured") {
			paymentDBDetails.status = razorpayPaymentDetails.status;
			await paymentDBDetails.save();
			await Cart.deleteOne({ userId: paymentDBDetails.userId });
		}

		if (razorpayEvent === "payment.failed") {
			paymentDBDetails.status = razorpayPaymentDetails.status;
			await paymentDBDetails.save();
		}

		res.status(200).json(
			new ApiResponse(200, { success: true }, "Webhook processed.")
		);
	})
);



module.exports = { paymentRouter };
