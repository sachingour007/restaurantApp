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
	asyncHandler(async (req, res) => {
		const webhookSignature = req.get("X-Razorpay-Signature");
		const isWebhooksValid = validateWebhookSignature(
			JSON.stringify(req.body),
			webhookSignature,
			process.env.RAZORPAY_WEBHOOKS_SECRET
		);

		if (!isWebhooksValid) {
			throw new ApiError(400, "Webhook Signature is invalid");
		}

		const razorpayEvent = req.body.event;
		const paymentEntity = req.body.payload?.payment?.entity;

		// Safety check
		if (!paymentEntity) {
			return res.status(200).json({ success: true });
		}

		const paymentDBDetails = await Payment.findOne({
			orderId: paymentEntity.order_id,
		});

		if (!paymentDBDetails) {
			return res.status(200).json({ success: true });
		}

		if (paymentDBDetails.status === "SUCCESS") {
			return res.status(200).json({ success: true });
		}

		// ✅ PAYMENT SUCCESS
		if (razorpayEvent === "payment.captured") {
			paymentDBDetails.status = "SUCCESS";

			await paymentDBDetails.save();

			await Cart.findByIdAndUpdate(
				{ userId: paymentDBDetails.userId },
				{
					$set: {
						item: [],
						updatedAt: new Date(),
					},
				},
				{ new: true }
			);
		}

		// ❌ PAYMENT FAILED
		if (razorpayEvent === "payment.failed") {
			paymentDBDetails.status = "FAILED";
			await paymentDBDetails.save();
		}

		return res
			.status(200)
			.json(new ApiResponse(200, { success: true }, "Webhook processed"));
	})
);

paymentRouter.get(
	"/payment/status/:orderId",
	userAuth,
	asyncHandler(async (req, res, next) => {
		const { orderId } = req.params;
		const payment = await Payment.findOne({ orderId: orderId });

		if (!payment) {
			return res
				.status(200)
				.json(
					new ApiResponse(200, { status: "PENDING" }, "Payment Pending.")
				);
		}

		if (payment.status === "SUCCESS") {
			return res
				.status(200)
				.json(
					new ApiResponse(200, { status: "SUCCESS" }, "Payment Sucess.")
				);
		}

		// Payment failed
		if (payment.status === "FAILED") {
			return res
				.status(200)
				.json(
					new ApiResponse(200, { status: "FAILED" }, "Payment Failed.")
				);
		}

		return res
			.status(200)
			.json(new ApiResponse(200, { status: "PENDING" }, "Payment Pending."));
	})
);

module.exports = { paymentRouter };
