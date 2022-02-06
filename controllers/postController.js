const mongoose = require("mongoose");
const { Post } = require("../models");

exports.postController = {
	// get all posts (GET /api/v1/posts)
	getAllPosts: (req, res, next) => {
		Post.find({})
			.then((posts) => {
				res.status(200).json({
					status: "success",
					postsLength: posts.length,
					posts,
				});
			})
			.catch((err) => {
				next(err);
			});
	},
	// create a post (POST /api/v1/posts)
	createOnePost: (req, res, next) => {
		Post.create({
			content: req.body.content,
			author: mongoose.Types.ObjectId(req.user.id),
		})
			.then((post) => {
				res.status(200).json({
					status: "success",
					post,
				});
			})
			.catch((err) => {
				next(err);
			});
	},
	// delete a post (DELETE /api/v1/posts/:postId)
	deleteOnePost: (req, res, next) => {
		const { postId } = req.params;
		Post.findByIdAndDelete(postId)
			.then(() => {
				res.status(200).json({
					status: "success",
				});
			})
			.catch((err) => {
				next(err);
			});
	},
	// update a post (PUT /api/v1/posts/:postId)
	updateOnePost: (req, res, next) => {
		const { postId } = req.params;
		Post.findByIdAndUpdate(
			postId,
			{
				content: req.body.content,
			},
			// new option to return the updated document
			// keep track of validating new post (Check if the content is empty or not)
			{ new: true, runValidators: true }
		)
			.then((post) => {
				res.status(200).json({
					status: "success",
					post,
				});
			})
			.catch((err) => {
				next(err);
			});
	},
};
