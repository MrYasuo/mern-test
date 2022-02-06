const jwt = require("jsonwebtoken");
const { User } = require("../../models");

module.exports = (req, res, next) => {
	// get token from header
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		req.user = null;
		return next(new Error("Missing authorization header"));
	}
	// split the word "Bearer" from the token
	const token = authHeader.split(" ")[1];
	let user;
	try {
		// try to decode the token
		user = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		next(err);
	}
	if (!user) {
		const err = new Error("Invalid token");
		err.statusCode = 401;
		next(err);
	}
	// verify the user in token
	User.findById(user.id, (err, user) => {
		if (err) return next(err);
		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			return next(error);
		}
		// the id parameter is the string representation of the ObjectId
		req.user = { userName: user.name, email: user.email, id: user.id };
		return next();
	});
};
