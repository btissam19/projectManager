
const mongoose = require('mongoose');
const userSingSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});
module.exports = userSingSchema;
