const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
			validate(val) {
				if (!validator.isEmail(val)) {
					throw new Error("Invalid email address: " + val);
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			validate(val) {
				if (!validator.isStrongPassword(val)) {
					throw new Error("Weak password: " + val);
				}
			},
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
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		createdAt: true,
	}
);

userSchema.methods.isPasswordValid = async function (userEnterPassword) {
	const user = this;
	const isPasswordValid = await bcrypt.compare(
		userEnterPassword,
		user.password
	);

	return isPasswordValid;
};

userSchema.methods.getJwt = async function () {
	const user = this;
	const token = await jwt.sign(
		{ _id: user._id },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
	return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
