const User = require("../models/user.model");
const { ApiError } = require("../utils/apiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");

const registerController = async (req, res) => {
  try {
    const { username, email, fullName, phone, password } = req.body;

    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    console.log("UserExist Data ", userExist);
    if (userExist) {
      return res
        .status(400)
        .json({ msg: "User with email or username already exists" });
    }
    const user = await User.create({
      username,
      email,
      fullName,
      phone,
      password,
    });
    const userCreated = await User.findById(user._id).select("-password");
    return res
      .status(201)
      .json(new ApiResponse(200, userCreated, "user registered successfully"));
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something is Missing in Registration ", error });
  }
};

module.exports = { registerController };

/**
User Register Steps :
  -Get the User Details from Frontend.
  -Validation : User Data is Empty or Not.
  -Check If user alreay Exists.
  -check for images, check for avtar.
  -upload them to cloudinary, avatar.
  -Create user object in Mongodb.
  -remove password and Tokens fields from response.
  -check for user creation.
  -return res.
*/
