const { authController } = require("./authController");
const { postController } = require("./postController");

module.exports = {
	register: authController.register,
	login: authController.login,
	logout: authController.logout,
	getAllPosts: postController.getAllPosts,
	createOnePost: postController.createOnePost,
	deleteOnePost: postController.deleteOnePost,
	updateOnePost: postController.updateOnePost,
};
