//.env file
require('dotenv').config();
// use express
const express = require('express');
// database
const { User, connectDB,Task,Truncs,Message} = require('./database/mongo');

const ADMIN_EMAILS = ['admin@gamil.com'];
const exphbs = require('express-handlebars');


// routes
const taskrouter = require('./router/task');
const transcRoute = require('./router/transaction');
const messageRoute=require('./router/message')



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
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views') , 
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
app.use('/message',messageRoute)


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



// ... (other imports and configurations)

app.get('/dashboard', isAuth, async (req, res) => {
    try {
        // Destructure the user properties for easier access
        const { _id, username } = req.user;

        // Fetch tasks and projects (truncs) associated with the current user.
        const [tasks, truncs] = await Promise.all([
            Task.find({ user: _id }).lean(),
            Truncs.find({ developer: username }).lean()
        ]);

        // Render the dashboard with the filtered tasks and projects.
        res.render('layouts/dashboard', { layout: false, tasks, truncs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// ... (rest of your code)

app.get('/project/user',isAuth,async (req, res) => {
    try {
        const truncs = await Truncs.find({developer:req.user.username}).lean();
        return res.render('projectforNormaleUser', { layout: false, truncs: truncs});
    } catch (e) {
        res.json({ msg: e });
    }
})
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
app.get('/users',isAdmin,async (req, res) => {
    try { // Added try/catch for error handling
        const users = await User.find({}).lean();
        res.render('users', { layout: false, users:users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/users/messages',isAuth,isAdmin,async(req,res)=>{

    try {
        // Get all messages and populate user data
        const messages = await Message.find({}).lean(); 
        console.log("Authenticated username:", req.user.username);

        console.log(messages)
        res.render('messageforAdmin', { layout : false ,messages: messages});
    } catch (err) {
        console.log(err);
    }


})
// app.get('/users/messages', isAuth, isAdmin, async (req, res) => {

//     try {
//         const page = parseInt(req.query.page) || 1; // default to page 1
//         const limit = 4; // 4 messages per page
//         const skip = (page - 1) * limit;

//         const totalMessages = await Message.countDocuments(); // Assuming your model name is Message
//         const totalPages = Math.ceil(totalMessages / limit);

//         // Get messages specific to the current page and populate user data
//         const messages = await Message.find().skip(skip).limit(limit).lean();
        
//         console.log("Authenticated username:", req.user.username);
//         console.log(messages);

//         res.render('messageforAdmin', { 
//             layout : false, 
//             messages: messages, 
//             currentPage: page, 
//             totalPages: totalPages 
//         });

//     } catch (err) {
//         console.log(err);
//     }
// });

app.get('/generalMessage',isAuth,(req,res)=>{
    res.render('generalMessage',{ layout: false ,  username: req.user.username })
   
})

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
