const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String },
    guestType: { type: [String] },
    numberPax: { type: Number },
    timeslot: { type: String },
    createdAt: { type: Date, default: Date.now }
});

rsvpSchema.index({ projectId: 1, createdAt: -1 });

module.exports = mongoose.model('Rsvp', rsvpSchema);
