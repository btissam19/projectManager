const express=require('express')
const isAuth=require('../midlleware/authoMiddleware').isAuth
const tasksRoute=express.Router();
const {deleteTask,editTask,getSingleTask,createNewTask,getAllTask}=require('../controllers/task')

tasksRoute.route('/').get(isAuth,getAllTask).post(isAuth,createNewTask)
tasksRoute.route('/:id').get(getSingleTask).patch(editTask).delete(deleteTask)
module.exports=tasksRoute

