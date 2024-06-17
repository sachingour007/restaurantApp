const { ApiError } = require("../utils/apiError.js");

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (e) {
    console.log(e);
    res.status(e.statusCode || 400).json({ message: e.errors[0].message });
  }
};

module.exports = validate;
