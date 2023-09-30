const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String,
    username : {
        type: String, // This is more for documentation than functionality since it's a String and not ObjectId
        required: true
    },
});

module.exports = MessageSchema;