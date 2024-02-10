const { User } = require('../database/mongo');
const passport = require('passport');
const {genPassword}=require('../midlleware/passportUtiliies')
require('../midlleware/passport')
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/?error=' + info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if (user.admin) {
                return res.redirect('/Admindashboard');
            } else {
                return res.redirect('/dashboard');
            }
        });
    })(req, res, next);
};

const signup = async (req, res, next) => {
    const existingUser = await User.findOne({ username: req.body.email }).lean();
    if (existingUser) {
        return res.render('sing', { layout: false, msg: 'User already exists in the database!' })
    }
    const saltHash = genPassword(req.body.password);
    const hash = saltHash.hash;
    const newUser = new User({
        username: req.body.email,
        hash: hash,
    });
    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/');
};
const showSignup = (req, res) => {
    res.render('sing', { layout: false });
};
const showLogin = (req, res) => {
    res.render('login', { layout: false });
};
const logout = function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};
module.exports={login,signup,showSignup,logout,showLogin}