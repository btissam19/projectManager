require('dotenv').config()
const mongoose = require('mongoose');
const uri=process.env.MONGODB_URI
const connectDB = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 const UserSchema= require('../models/User')
 const taskSchema=require('../models/Task')
 const projectSchema=require('../models/Project')
 const MessageSchema=require('../models/Message')
const User = connectDB.model('User',UserSchema);
const Task=connectDB.model('Task',taskSchema)
const Project=connectDB.model('Project',projectSchema)
const Message=connectDB.model('Message',MessageSchema)

module.exports = { connectDB, User , Task, Project, Message};