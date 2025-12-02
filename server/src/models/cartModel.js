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
				foodName: {
					type: String,
					required: true,
				},
				price: {
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
	this.totalPrice = this.item.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
