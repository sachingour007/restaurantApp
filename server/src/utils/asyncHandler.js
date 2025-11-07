const asyncHandler = (fn) => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch((err) => next(err));
	};
};

module.exports = { asyncHandler };

/**  For Refrence Other way of Handler
 * 
 * 
		const trycatchAsyncHandler = (fn) => {
			return async function (req, res, next) {
				try {
					await fn(req, res, next);
				} catch (error) {
					next(error);
				}
			};
		};
*/
