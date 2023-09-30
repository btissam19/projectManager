require('dotenv').config()
const mongoose = require('mongoose');
const uri=process.env.MONGODB_URI
const connectDB = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 const UserSchema= require('../models/User')
 const taskSchema=require('../models/Task')
 const projectSchema=require('../models/Transc')
 const UserprojectSchema=require('../models/UserProject');
const User = connectDB.model('User',UserSchema);
const Task=connectDB.model('Task',taskSchema)
const Truncs=connectDB.model('Project',projectSchema)
const UserProject=connectDB.model('UserProject',UserprojectSchema)

module.exports = {
    connectDB,
    User ,
    Task,
    Truncs,
    UserProject
};