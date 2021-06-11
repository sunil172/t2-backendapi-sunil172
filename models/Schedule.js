const mongoose = require('mongoose');
const User = require('./User');
const Decision = require('./Decision').schema;
const Agenda = require('./Agenda').schema;

const scheduleSchema = new mongoose.Schema(
	{
		meeting_title: {
			type: String,
			required: true
		},
		meeting_desc: {
			type: String
		},
		date: {
			type: String,
			required: true
		},
		time: {
			type: String,
			required: true
		},
		venue: {
			type: String,
			required: true
		},
		attendees: [
			{
				participants: {
					type: mongoose.Schema.Types.ObjectId,
					ref: User
				},
				present_status: {
					type: String,
					enum: [ 'present', 'absent' ],
					default: 'absent'
				}
			}
		],
		agenda: [ Agenda ],
		compeleted: {
			type: Boolean,
			default: false
		},
		decision: [ Decision ]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Schedule', scheduleSchema);
