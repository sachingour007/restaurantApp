const User = require("../models/user.model.js");
const { ApiError } = require("../utils/apiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");

//method for refreshToken and accessToken

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); //we save the date without validation

    return { accesToken, refreshToken };
  } catch {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerController = async (req, res) => {
  try {
    const { username, email, fullName, phone, password } = req.body;

    //Test case for Blank value
    if (
      [username, email, fullName, phone, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      // return res.status(400).json("All fields are required");
      throw new ApiError(400, "All fields are required");
    }

    //Test case for Username and email exist.
    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    console.log("UserExist Data ", userExist);
    if (userExist) {
      // return res
      //   .status(400)
      //   .json({ msg: "User with email or username already exists" });
      throw new ApiError(400, "User with email or username already exists");
    }
    const user = await User.create({
      username,
      email,
      fullName,
      phone,
      password,
    });
    const userCreated = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(201)
      .json(new ApiResponse(200, userCreated, "user registered successfully"));
  } catch (error) {
    // return res
    //   .status(400)
    //   .json({ msg: "Something is Missing in Registration ", error });
    // console.log("catch block", error);
    // console.log(new ApiResponse(400, error.message), error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username) {
      throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user Credntials");
    }

    const { accesToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // user = { ...user, refreshToken }; // we update the user with new value of refreshToken
    const loggedInUser = user
      .findOne(user._id)
      .select("-password -refreshToken");

    //tonken sent in Cookies

    //Option object help us to frontend can not change cookies.
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accesToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accesToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, error });
  }
};

const logoutUser = async () => {
  try{

  }catch(error){
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message, error });
  }
}

module.exports = { registerController, loginUser };

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

/*
User login Steps:
  -req.body -> data collect
  -username or email find on db
  -password check
  -access and refresh token
  -send cookies
*/
