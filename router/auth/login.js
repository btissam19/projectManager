const express = require('express');
const {login,showLogin} = require('../../controllers/auth');
const router = express.Router();
router.route('/').post(login).get(showLogin);
module.exports=router;