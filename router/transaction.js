const express = require('express')
const transc=express.Router()
const isAdmin = require('../midlleware/authoMiddleware').isAdmin;
const isAuth = require('../midlleware/authoMiddleware').isAuth;
const {createTruncs,getAllTruncs,updatTruncs,deleteTruncs,getOneTruncs,getAllTruncsforUser} =require('../controllers/transaction')
transc.route('/').get(isAdmin,getAllTruncs).post(isAdmin,createTruncs);
transc.route('/user').get(isAuth,getAllTruncsforUser);
transc.route('/:id').patch(updatTruncs).delete(deleteTruncs).get(getOneTruncs);
module.exports=transc