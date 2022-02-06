const express = require("express");
const router = express.Router();
const secured = require("../libs/middlewares/secured");
const {
	getAllPosts,
	updateOnePost,
	deleteOnePost,
	createOnePost,
} = require("../controllers");

// intercept all the requests with the secured middleware (validate token)
router.all("/", secured);
// if user is authenticated, then continue
router.route("/").get(getAllPosts).post(createOnePost);
router.route("/:postId").delete(deleteOnePost).put(updateOnePost);

module.exports = router;
