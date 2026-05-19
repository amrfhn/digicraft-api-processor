const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

wishSchema.index({ projectId: 1, createdAt: -1 });

module.exports = mongoose.model('Wish', wishSchema);
