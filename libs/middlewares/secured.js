const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		req.user = null;
		return next();
	}
	// split the word "Bearer" from the token
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return next("Token is not valid");
	}
	if (!decodedToken) {
		return next(new Error("Token is not valid"));
	}
	req.user = decodedToken;
	next();
};
