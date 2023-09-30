const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String,
});

module.exports = MessageSchema;