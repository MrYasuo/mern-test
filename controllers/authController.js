const { User } = require("../models");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

exports.authController = {
	// register a new user (POST /api/v1/auth/register)
	register: async (req, res, next) => {
		const { name, email, password } = req.body;
		// hash the password
		const hashPassword = await argon2.hash(password);
		// create new user
		// can either use callback or promise - then chaining
		User.create({
			name,
			email,
			password: hashPassword,
		})
			.then((user) => {
				// generate new jwt
				const token = jwt.sign(
					{ id: user.id, userName: user.name, email: user.email },
					process.env.JWT_SECRET
				);
				return res.json({
					status: "success",
					data: { userName: user.name, token },
				});
			})
			.catch((err) => {
				return next(err);
			});
	},
	// login a user (POST /api/v1/auth/login)
	login: (req, res, next) => {
		const { email, password } = req.body;
		// query the db to find user
		// can either use callback or promise with then chaining
		User.findOne({ email: email }, async (err, user) => {
			if (err) next(err);
			if (!user) {
				const err = new Error("User not found!");
				err.statusCode = 404;
				return next(err);
			}
			// compare the password with argon2
			const isValid = await argon2.verify(user.password, password);
			if (!isValid) {
				const err = new Error("Invalid password!");
				err.statusCode = 401;
				return next(err);
			}
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
	logout: (res) => {
		res.status(200).json({
			status: "success",
			data: { message: "Logout successfully" },
		});
	},
};
