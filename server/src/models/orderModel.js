const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orderId: {
			type: String,
			required: true,
			unique: true,
		},
		items: [
			{
				foodId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Menu",
					required: true,
				},
				foodImg: {
					type: String,
					required: true,
				},
				foodName: {
					type: String,
					required: true,
				},
				foodDiscount: {
					type: Number,
					required: true,
				},
				finalPrice: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],

		pricing: {
			subTotal: {
				type: Number,
				default: 0,
			},
			gstPrice: {
				type: Number,
				default: 5,
			},
			deliveryCharges: {
				type: Number,
				default: 0,
			},
			totalPrice: {
				type: Number,
				default: 0,
			},
		},

		payment: {
			status: {
				type: String,
			},
		},
		orderStatus: {
			type: String,
			required: true,
		},
		deliveryDetails: {
			fullName: String,
			email: String,
			phone: Number,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
