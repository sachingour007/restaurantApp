const { ApiError } = require("./ApiError");

const isValidateUpdateData = (req) => {
	const {
		foodImage,
		foodName,
		description,
		price,
		category,
		about,
		isFeature,
	} = req.body;

	const isFieldEmpty = Object.values(req.body).some(
		(val) => val === "" || val === undefined || val === null
	);

	if (isFieldEmpty) {
		return next(new ApiError(400, "Empty Fields Not Accepted !"));
	}

	const allowedFields = [
		"foodImage",
		"foodName",
		"description",
		"price",
		"category",
		"isFeature",
	];

	const isEditAllowed = Object.keys(req.body).every((field) =>
		allowedFields.includes(field)
	);

	return isEditAllowed;
};

module.exports = { isValidateUpdateData };
