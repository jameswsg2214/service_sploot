const bcrypt = require("bcrypt");
const saltRounds = 10;

const bcryptService = () => {
	const password = user => {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(user.password, salt);

		return hash;
	};

	const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

	const updatePassword = pass => {
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(pass, salt);
		return hash;
	};

	return {
		password,
		comparePassword,
		updatePassword
	};
};

module.exports = bcryptService;
