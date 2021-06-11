const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema ({
    agenda_title: {
        type: String
    },
    agenda_description: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Agenda', agendaSchema);