module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	if (err.code === 11000) {
		err.message = "Duplicate key error";
		err.statusCode = 400;
	}
	if (err.kind === "ObjectId") {
		err.message = "ObjectId not valid";
		err.statusCode = 400;
	}
	res.status(err.statusCode).json({
		status: err.statusCode,
		message: err.message,
	});
};
