// const router = require('express').Router();
// const passport = require('passport');
// const genPassword = require('../midlleware/passportUtiliies').genPassword;
// const connection = require('../database/mongo');
// const User = require('../models/User')
//  router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/dashboard' }));
//  router.post('/singup', (req, res, next) => {
//     const saltHash = genPassword(req.body.password);
    
//     const salt = saltHash.salt;
//     const hash = saltHash.hash;

//     const newUser = new User({
//         username: req.body.email,
//         hash: hash,
//         salt: salt,
//     });

//     newUser.save()
//         .then((user) => {
//             console.log(user);
//         });

//     res.redirect('/login');
//  });
const express = require('express');
const {login} = require('../../controllers/auth');
const router = express.Router();
router.post('/', login);
module.exports=router;