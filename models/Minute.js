const mongoose = require('mongoose');
const schedule = require('./Schedule');

const minuteSchema = new mongoose.Schema ({
    minute_desc: {
        type: String,
        required: true
    },
    schedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: schedule
    }],
    decisions: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Minute', minuteSchema);