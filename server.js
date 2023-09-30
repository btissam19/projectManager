//.env file
require('dotenv').config();
// use express
const express = require('express');
// database
const { User, connectDB,Task,Truncs} = require('./database/mongo');

const ADMIN_EMAILS = ['admin@gamil.com'];
// templet engine
const exphbs = require('express-handlebars');
// routes
const taskrouter = require('./router/task');
const transcRoute = require('./router/transaction');
const usersRoute=require('./router/users')
// database models 

//controller for autntication 

const isAuth = require('./midlleware/authoMiddleware').isAuth;
const isAdmin = require('./midlleware/authoMiddleware').isAdmin;
//path
const path=require('path')
// passport and sesions
const session = require('express-session');
const passport = require('passport');
const ConnectMongo = require('connect-mongo');
const MongoStore = ConnectMongo(session);
// express app
const app = express();
const port = process.env.PORT || 3000;
// general express middleware
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, './views'),
    partialsDir: 'views/partials'
}));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// store session in database
const  sessionStore = new MongoStore({ mongooseConnection:connectDB , collection: 'sessions' });

app.use(session({
    secret: "secterkay",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
require('./database/passport')
app.use(passport.initialize());
app.use(passport.session());
app.use('/task', taskrouter);
app.use('/transaction', transcRoute);
app.use('/users',usersRoute)


// app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/dashboard' }));

app.post('/login', (req, res, next) => {
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
});


app.post('/singup',async (req, res, next) => {

    const existingUser = await User.findOne({ username: req.body.email }).lean();
    
    if (existingUser) {
        return res.render('sing',{ layout: false, msg: 'User already exists in the database!' })
    }
   const saltHash = genPassword(req.body.password);
   const hash = saltHash.hash;
   
   const newUser = new User({
       username: req.body.email,
       hash: hash,
       admin: ADMIN_EMAILS.includes(req.body.email)
   });

   newUser.save()
       .then((user) => {
           console.log(user);
       });

   res.redirect('/');
});
app.get('/', (req, res) => {  
    let errorMessage = req.query.error;
    res.render('login', { layout: false, error: errorMessage });});


app.get('/dashboard', isAuth, async (req, res) => {
    try { // Added try/catch for error handling
        const tasks = await Task.find({user: req.user._id } ).lean();
        console.log(tasks);
        const truncs = await Truncs.find({}).lean();
        res.render('layouts/dashboard', { layout: false, tasks: tasks, truncs: truncs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/Admindashboard',isAuth, isAdmin, async (req, res) => {
    try { // Added try/catch for error handling
        const truncs = await Truncs.find({}).lean();
        res.render('layouts/adminDashboard', { layout: false, truncs: truncs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/project',isAuth, async (req, res) => {
    try {
        const users=await User.find({}).lean();
        res.render('projectForms',{ layout: false ,users:users});
    } catch (error) {
        console.log(error)
    }
   
});



app.get('/singup', (req, res) => res.render('sing', { layout: false }));
app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
 app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
