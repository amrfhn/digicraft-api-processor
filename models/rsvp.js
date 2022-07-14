const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isAttending: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    guestType: {
        type: String,
        required: false
    },
    paxCount: {
        type: String,
        required: false
    },
    timeSlot: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Rsvp', rsvpSchema)