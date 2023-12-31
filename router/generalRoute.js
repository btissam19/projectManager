const express = require('express');
const { Task, Project, User, Message } = require('../database/mongo');
const isAuth = require('../midlleware/authoMiddleware').isAuth;
const isAdmin = require('../midlleware/authoMiddleware').isAdmin;

const router = express.Router();

router.get('/', (req, res) => {  
    let errorMessage = req.query.error;
    res.render('home', { layout: false, error: errorMessage });
});

router.get('/dashboard', isAuth, async (req, res) => {
    try {
        const { _id, username } = req.user;
        const [tasks, projects] = await Promise.all([
            Task.find({ user: _id }).lean(),
            Project.find({ developer: username }).lean()
        ]);
        res.render('layouts/dashboard', { layout: false, tasks, projects , username});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/project/user', isAuth, async (req, res) => {
    try {
        const projects = await Project.find({developer:req.user.username}).lean();
        return res.render('projectforNormaleUser', { layout: false, projects: projects});
    } catch (e) {
        res.json({ msg: e });
    }
});

router.get('/Admindashboard', isAuth, isAdmin, async (req, res) => {
    try { 
        const projects = await Project.find({}).lean();
        res.render('layouts/adminDashboard', { layout: false, projects: projects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/project', isAuth, async (req, res) => {
    try {
        const users = await User.find({}).lean();
        res.render('addProject', { layout: false, users:users });
    } catch (error) {
        console.log(error);
    }
});

router.get('/users', isAdmin, async (req, res) => {
    try { 
        const users = await User.find({}).lean();
        res.render('users', { layout: false, users:users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/users/messages', isAuth, isAdmin, async (req, res) => {
    try {
        const messages = await Message.find({}).lean(); 
        res.render('messageforAdmin', { layout: false, messages: messages });
    } catch (err) {
        console.log(err);
    }
});

router.get('/generalMessage', isAuth, (req, res) => {
    res.render('generalMessage', { layout: false, username: req.user.username });
});

module.exports = router;
