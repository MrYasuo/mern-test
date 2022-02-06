const { authController } = require("./authController");

module.exports = {
	register: authController.register,
	login: authController.login,
};
