const express = require("express");
const router = express.Router();
const secured = require("../libs/middlewares/secured");
const { register, login } = require("../controllers");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
