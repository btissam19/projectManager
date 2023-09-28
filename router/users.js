const express=require('express')
const UsersRoute=express.Router();
const {getAllUsers}=require('../controllers/users')
UsersRoute.route('/').get(getAllUsers)
module.exports=UsersRoute