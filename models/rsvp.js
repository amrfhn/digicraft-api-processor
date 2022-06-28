const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isAttending: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    guestType: {
        type: String,
        required: true
    },
    paxCount: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Rsvp', rsvpSchema)