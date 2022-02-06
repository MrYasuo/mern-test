const express = require("express");
const router = express.Router();
const secured = require("../libs/middlewares/secured");
const { register, login } = require("../controllers");

router.post("/login", login);
router.post("/register", register);
router.get("/", secured, (req, res) => {
	console.log(req.user);
});

module.exports = router;
