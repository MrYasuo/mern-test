const mongoose = require("mongoose");

module.exports = mongoose.model(
	"User",
	new mongoose.Schema(
		{
			name: {
				type: String,
				trim: true,
				required: [true, "Name is required"],
			},
			email: {
				type: String,
				unique: true,
				trim: true,
				required: [true, "Email is required"],
			},
			password: {
				type: String,
				trim: true,
				required: [true, "Password is required"],
				minlength: [6, "Password must be at least 6 characters"],
			},
		},
		{ timestamps: true }
	)
);
