const express = require('express');
const {signup,showSignup,logout} = require('../../controllers/auth');
const router = express.Router();
router.route('/').post(signup).get(showSignup);

module.exports = router;
