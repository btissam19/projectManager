const mongoose = require('mongoose');

const userSingSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: { type: Boolean, default: false }
});

module.exports = userSingSchema;
