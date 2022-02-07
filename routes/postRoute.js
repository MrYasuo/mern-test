const express = require("express");
const router = express.Router();
const secured = require("../libs/middlewares/secured");
const {
	getAllPosts,
	updateOnePost,
	deleteOnePost,
	createOnePost,
} = require("../controllers");

router.get("/", getAllPosts);
// intercept requests with the secured middleware (validate token)
router.all("/", secured);
// if user is authenticated, then continue
router.post("/", createOnePost);
router.route("/:postId").delete(deleteOnePost).put(updateOnePost);

module.exports = router;
