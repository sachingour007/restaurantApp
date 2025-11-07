const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			require: true,
			trim: true,
		},
		email: {
			type: String,
			require: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			require: true,
			trim: true,
		},
		phone: {
			type: String,
			min: [10, "Please Enter Valid Number"],
			max: [10, "Please Enter Valid Number"],
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
