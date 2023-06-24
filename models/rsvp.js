const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    guestType: {
        type: String,
        required: false
    },
    numberPax: {
        type: String,
        required: false
    },
    timeslot: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('Rsvp', rsvpSchema)