const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/apiError.js");

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unathorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("decodeToken", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    // throw new ApiError(401, error?.message || "Invalid access token");
    console.log(error);
    return res
      .status(error.statusCode || 401)
      .json({ message: error.message || "Invalid access token", error });
  }
};

module.exports = { verifyJWT };

/*
 * if we don't need the res parameter we can use _ (underscor) for res variable
 */
