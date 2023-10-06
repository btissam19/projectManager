const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String,
    username : {
        type: String, 
        required: true
    },
});

module.exports = MessageSchema;