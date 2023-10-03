require('dotenv').config();
const port = process.env.PORT || 3000;
const path= require('path')
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const taskrouter = require('./router/task');
const transcRoute = require('./router/transaction');
const messageRoute=require('./router/message')
const isAuth = require('./midlleware/authoMiddleware').isAuth;
const isAdmin = require('./midlleware/authoMiddleware').isAdmin;
const session = require('express-session');
const passport = require('passport');
require('./database/passport')
const ConnectMongo = require('connect-mongo');
const MongoStore = ConnectMongo(session);
const { User, connectDB,Task,Truncs,Message} = require('./database/mongo');
const ADMIN_EMAILS = ['admin@gamil.com'];
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views') , 
    partialsDir: 'views/partials'
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
const  sessionStore = new MongoStore({ mongooseConnection:connectDB , collection: 'sessions' });
app.use(session({
    secret: "secterkay",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/task', taskrouter);
app.use('/transaction', transcRoute);
app.use('/message',messageRoute)
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
app.get('/singup', (req, res) => res.render('sing', { layout: false }));
app.get('/', (req, res) => {  
    let errorMessage = req.query.error;
    res.render('login', { layout: false, error: errorMessage });
});
app.get('/dashboard', isAuth, async (req, res) => {
    try {
        const { _id, username } = req.user;
        const [tasks, truncs] = await Promise.all([
            Task.find({ user: _id }).lean(),
            Truncs.find({ developer: username }).lean()
        ]);
        res.render('layouts/dashboard', { layout: false, tasks, truncs , username});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/project/user',isAuth,async (req, res) => {
    try {
        const truncs = await Truncs.find({developer:req.user.username}).lean();
        
        return res.render('projectforNormaleUser', { layout: false, truncs: truncs});
    } catch (e) {
        res.json({ msg: e });
    }
})
app.get('/Admindashboard',isAuth, isAdmin, async (req, res) => {
    try { 
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
app.get('/users',isAdmin,async (req, res) => {
    try { 
        const users = await User.find({}).lean();
        res.render('users', { layout: false, users:users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/users/messages',isAuth,isAdmin,async(req,res)=>{
    try {
        const messages = await Message.find({}).lean(); 
        console.log("Authenticated username:", req.user.username);

        res.render('messageforAdmin', { layout : false ,messages: messages});
    } catch (err) {
        console.log(err);
    }


})
app.get('/generalMessage',isAuth,(req,res)=>{
    res.render('generalMessage',{ layout: false ,  username: req.user.username })
   
})

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
 app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
