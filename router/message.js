const express=require('express')
const isAuth=require('../midlleware/authoMiddleware').isAuth
const messageRoute=express.Router();
const { createMessage , getAllMessages }=require('../controllers/message')
messageRoute.route('/').get(isAuth,getAllMessages).post(isAuth,createMessage)
module.exports=messageRoute