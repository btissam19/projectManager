const express = require('express')
const transc=express.Router()
const {createTruncs,getAllTruncs,updatTruncs,deleteTruncs,getOneTruncs} =require('../controllers/transaction')
transc.route('/').get(getAllTruncs).post(createTruncs)
transc.route('/:id').patch(updatTruncs).delete(deleteTruncs).get(getOneTruncs)
module.exports=transc