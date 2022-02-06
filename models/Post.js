const mongoose = require("mongoose");

module.exports = mongoose.model(
	"Post",
	new mongoose.Schema(
		{
			content: {
				type: String,
				required: [true, "Post content is required"],
				// remove extra whitespace
				trim: true,
			},
			author: {
				// use for populate()
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		},
		// add "CreatedAt" and "UpdatedAt" fields
		{ timestamps: true }
	)
);
