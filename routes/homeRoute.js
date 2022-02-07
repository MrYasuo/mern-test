const express = require("express");
const router = express.Router();
const secured = require("../libs/middlewares/secured");

router.get("/", secured, (req, res) => {
	res.status(200).json({
		userName: req.user.userName,
	});
});

module.exports = router;
