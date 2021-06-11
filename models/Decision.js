const mongoose = require('mongoose');

decisionSchema = new mongoose.Schema ({
    decision: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Decision', decisionSchema);