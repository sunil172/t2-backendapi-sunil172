const validator = require('validator');

const registerInput = (data) => {
	let errors = {};

	if (data.email) {
		if (!validator.isLength(data.email.trim(), { min: 4, max: 35 })) {
			errors.email = 'Should required valid email address';
		}
	} else errors.username = 'Email is required';

	if (data.password) {
		if (!validator.isLength(data.password.trim(), { min: 5, max: 30 })) {
			errors.password = 'Password must be between 5 to 30 characters';
		}
	} else errors.password = 'Password is  required';
	return {
		errors,
		isValid: Object.keys(errors).length == 0
	};
};

module.exports = {
	registerInput
};
