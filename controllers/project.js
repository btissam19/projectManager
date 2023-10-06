const { Project, User } = require('../database/mongo');
const getAllProject = async (req, res) => {
    try {
        const projects = await Project.find({}).lean();
        const users = await User.find({}).lean();
        return res.render('projectIndex', { layout: false, projects, users });
    } catch (e) {
        res.json({ msg: e.message });
    }
};
const createProject = async (req, res) => {
    try {
        const { project, developer, client, status } = req.body; 
        const newProject = new Project({ project, developer, client, status });
        await newProject.save();
        return res.json(newProject);
    } catch (e) {
        return res.json({ msg: e.message });
    }
};
const getAllProjectforUser = async (req, res) => {
    try {
        const projects = await Project.find({ developer: req.user.username }).lean();
        return res.render('projectforNormaleUser', { layout: false, projects: projects });
    } catch (e) {
        res.json({ msg: e });
    }
};
const getOneProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).lean();
        if (!project) {
            return res.status(404).send("Project not found");
        }
        return res.render('editProject', { project, layout: false });
    } catch (e) {
        res.json({ msg: e.message });
    }
};
const updatProject = async (req, res) => {
    const allowedUpdates = ['project', 'developer', 'client', 'status'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const projects = await Project.findById(req.params.id);
        if (!projects) {
            return res.status(404).send({ error: 'Project not found' });
        }
        updates.forEach(update => projects[update] = req.body[update]);
        await projects.save();
        res.json({ msg: 'Project updated successfully', data: projects });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};
const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        return res.json({ success: true, msg: "Project deleted successfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, msg: "Failed to delete project" });
    }
};


module.exports = { createProject, getAllProject, updatProject, deleteProject, getOneProject, getAllProjectforUser };
