const express = require('express')
const project=express.Router()
const isAdmin = require('../midlleware/authoMiddleware').isAdmin;
const isAuth = require('../midlleware/authoMiddleware').isAuth;
const {createProject,getAllProject,updatProject,deleteProject,getOneProject,getAllProjectforUser} =require('../controllers/project')
project.route('/').get(isAdmin,getAllProject).post(isAdmin,createProject);
project.route('/user').get(isAuth,getAllProjectforUser);
project.route('/:id').patch(updatProject).delete(deleteProject).get(getOneProject);
module.exports=project