const { User } = require("../models");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.authController = {
	register: async (req, res) => {
		const { name, email, password } = req.body;
		// hash the password
		const hashPassword = await argon2.hash(password);
		// create new user
		// can either use callback or promise with then chaining
		User.create(
			{
				name,
				email,
				password: hashPassword,
			},
			(user) => {
				// generate new jwt
				const token = jwt.sign(
					{ id: user.id, userName: user.name, email: user.email },
					process.env.JWT_SECRET
				);
				return res.json({
					status: "success",
					data: { userName: user.name, token },
				});
			}
		);
	},
	login: (req, res) => {
		const { email, password } = req.body;
		// query the db to find user
		// can either use callback or promise with then chaining
		User.findOne({ email: email }, async (err, user) => {
			if (err) return res.status(400).json(err);
			if (!user) return res.status(400).json("User not found");
			// compare the password with argon2
			const isValid = await argon2.verify(user.password, password);
			if (!isValid) return res.status(400).json("Password is incorrect");
			// generate new jwt
			const token = jwt.sign(
				{ id: user.id, userName: user.name, email: user.email },
				process.env.JWT_SECRET
			);
			return res.json({
				status: "success",
				data: { userName: user.name, token },
			});
		});
	},
};
