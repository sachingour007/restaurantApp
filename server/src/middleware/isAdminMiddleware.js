const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const isAdminMiddleware = asyncHandler(async (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(new ApiError(403, "Access denied"));
	}
	next();
});

module.exports = { isAdminMiddleware };
