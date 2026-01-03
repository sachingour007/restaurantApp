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
		console.log("🔔 Razorpay Webhook HIT");

		const webhookSignature = req.get("X-Razorpay-Signature");
		console.log("🔐 Razorpay Signature Header:", webhookSignature);

		console.log("📦 Webhook Body:", JSON.stringify(req.body));

		const isWebhooksValid = validateWebhookSignature(
			JSON.stringify(req.body),
			webhookSignature,
			process.env.RAZORPAY_WEBHOOKS_SECRET
		);

		console.log("✅ Is Webhook Signature Valid?", isWebhooksValid);

		if (!isWebhooksValid) {
			console.error("❌ Invalid Webhook Signature");
			throw new ApiError(400, "Webhook Signature is invalid");
		}

		const razorpayEvent = req.body.event;
		const paymentEntity = req.body.payload?.payment?.entity;

		console.log("📌 Razorpay Event:", razorpayEvent);
		console.log("💳 Payment Entity:", paymentEntity);

		// Safety check
		if (!paymentEntity) {
			console.warn("⚠️ Payment entity missing in webhook payload");
			return res.status(200).json({ success: true });
		}

		const paymentDBDetails = await Payment.findOne({
			orderId: paymentEntity.order_id,
		});

		console.log("🗄️ Payment found in DB:", paymentDBDetails?._id);

		if (!paymentDBDetails) {
			console.warn(
				"⚠️ Payment record not found for orderId:",
				paymentEntity.order_id
			);
			return res.status(200).json({ success: true });
		}

		// 🔁 Idempotency check
		if (paymentDBDetails.status === "SUCCESS") {
			console.log("🔁 Duplicate webhook ignored (already SUCCESS)");
			return res.status(200).json({ success: true });
		}

		// ✅ PAYMENT SUCCESS
		if (razorpayEvent === "payment.captured") {
			console.log("🎉 Payment CAPTURED");

			paymentDBDetails.status = "SUCCESS";
			paymentDBDetails.razorpayPaymentId = paymentEntity.id;
			paymentDBDetails.amount = paymentEntity.amount;

			await paymentDBDetails.save();
			console.log("✅ Payment status updated in DB");

			await Cart.deleteOne({ userId: paymentDBDetails.userId });
			console.log("🗑️ Cart deleted for user:", paymentDBDetails.userId);
		}

		// ❌ PAYMENT FAILED
		if (razorpayEvent === "payment.failed") {
			console.log("❌ Payment FAILED");

			paymentDBDetails.status = "FAILED";
			await paymentDBDetails.save();

			console.log("⚠️ Payment marked as FAILED in DB");
		}

		console.log("✅ Webhook processing completed");

		return res
			.status(200)
			.json(new ApiResponse(200, { success: true }, "Webhook processed"));
	})
);

module.exports = { paymentRouter };
