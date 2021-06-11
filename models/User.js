const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true
		},
		designation: {
			type: String
		},
		contact: {
			type: String
		},
		organization: {
			type: String
		},
		org_address: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		},
		role: {
			type: String,
			default: 'user',
			enum: [ 'basic', 'user', 'admin' ]
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
