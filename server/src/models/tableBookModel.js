const mongoose = require("mongoose");
const validator = require("validator");

const tableBookSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: [true, "Phone number is required"],
			validate: {
				validator: function (v) {
					return /^\d{10}$/.test(v);
				},
				message: "Please enter valid number",
			},
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			validate(val) {
				if (!validator.isEmail(val)) {
					throw new Error("Invalid email address: " + val);
				}
			},
		},
		personCount: {
			type: Number,
			required: true,
			min: [2, "Please Enter Min 2"],
			max: [6, "Please Enter Max 6"],
		},
		date: {
			type: String,
			required: true,
		},
		timeSlot: {
			type: String,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled"],
			default: "pending",
		},
	},

	{
		timestamps: true,
	}
);

const BookingData = mongoose.model("BookingData", tableBookSchema);

module.exports = BookingData;
