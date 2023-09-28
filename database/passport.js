const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./mongo');
const validPassword = require('../midlleware/passportUtiliies').validPassword;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
    User.findOne({ username: username })
        .then((user) => {
            if (!user) { 
                return done(null, false, { message: 'User not found.' }); // Added custom message here
            }
            
            const isValid = validPassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Wrong password.' }); // Added custom message here
            }
        })
        .catch((err) => {   
            done(err);
        });
}


const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});