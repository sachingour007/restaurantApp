const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		item: [
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
				price: {
					type: Number,
					required: true,
				},
				finalPrice: {
					type: Number,
					required: true,
				},
				foodDiscount: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					min: 1,
					default: 1,
				},
			},
		],
		totalItems: {
			type: Number,
			default: 0,
		},
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
	{
		timestamps: true,
	}
);

cartSchema.methods.calculateTotals = function () {
	this.totalItems = this.item.reduce((sum, item) => sum + item.quantity, 0);
	this.subTotal = this.item.reduce(
		(sum, item) => sum + item.finalPrice * item.quantity,
		0
	);
	this.gstPrice = Number(((this.subTotal * 5) / 100).toFixed(2));
	this.deliveryCharges = this.subTotal + this.gstPrice > 500 ? 0 : 30;

	this.totalPrice = this.subTotal + this.gstPrice + this.deliveryCharges;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
