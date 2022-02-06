const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res) => {
	User.find({}, (err, user) => {
		console.log(user[0].id);
		if (err) return res.json(err);
		return res.json(user);
	});
});

module.exports = router;
