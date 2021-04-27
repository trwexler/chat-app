const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userName: { 
        type: String,
        required: [
            true, 
            "User name is required!"
        ]
    },
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);

