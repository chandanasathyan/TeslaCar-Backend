const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    sessionId: String,
    text: String,
    sender: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
