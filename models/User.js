const mongoose = require("mongoose");

module.exports = mongoose.model(
	"User",
	new mongoose.Schema(
		{
			name: {
				type: String,
				// remove extra whitespace
				trim: true,
				required: [true, "Name is required"],
			},
			email: {
				type: String,
				// hold the email is unique
				unique: true,
				// remove extra whitespace
				trim: true,
				required: [true, "Email is required"],
			},
			password: {
				type: String,
				// remove extra whitespace
				trim: true,
				required: [true, "Password is required"],
				minlength: [6, "Password must be at least 6 characters"],
			},
		},
		// add "CreatedAt" and "UpdatedAt" fields
		{ timestamps: true }
	)
);
