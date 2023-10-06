// server.js

require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const ConnectMongo = require('connect-mongo');

const { connectDB } = require('./database/mongo');

// Routes
const taskrouter = require('./router/task');
const transcRoute = require('./router/transaction');
const messageRoute = require('./router/message');
// const authRoute = require('./router/auth');
const loginRoute=require('./router/auth/login')
const logoutRoute=require('./router/auth/logout')
const singupRoute=require('./router/auth/singup')
const dashboardRoute = require('./router/generalRoute');

const app = express();
const MongoStore = ConnectMongo(session);

app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views'), 
    partialsDir: 'views/partials'
}));

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const sessionStore = new MongoStore({ mongooseConnection: connectDB, collection: 'sessions' });
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

// Use routes
app.use('/task', taskrouter);
app.use('/transaction', transcRoute);
app.use('/message', messageRoute);
app.use('/singup',singupRoute);
app.use('/login', loginRoute); 
app.use('/logout',logoutRoute)
app.use('/', dashboardRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
