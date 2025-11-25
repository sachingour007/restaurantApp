const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
	{
		foodImage: {
			type: String,
			require: true,
			trim: true,
		},
		foodName: {
			type: String,
			require: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		description: {
			type: String,
			trim: true,
			require: true,
			lowercase: true,
			maxlength: [150, "Description cannot be more than 150 characters"],
		},
		price: {
			type: Number,
			require: true,
			min: [1, "Please Enter Minimum Amount"],
			trim: true,
		},
		category: {
			type: String,
			require: true,
			enum: ["pizza", "burger", "pasta", "fries"],
			trim: true,
			lowercase: true,
		},
		isFeature: {
			type: Boolean,
			default: false,
		},
		discount: {
			type: Number,
			default: 0,
		},
		discountTitle: {
			type: String,
			default: "",
		},
		discountTagline: {
			type: String,
			default: "",
		},
	},
	{
		createdAt: true,
	}
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
