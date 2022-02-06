const mongoose = require("mongoose");

module.exports = async () => {
	await mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((err) => {
			console.error(err);
		});
};
