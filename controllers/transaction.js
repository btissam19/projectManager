const { Truncs, User } = require('../database/mongo');

const getAllTruncs = async (req, res) => {
    try {
        const truncs = await Truncs.find({}).lean();
        const users = await User.find({}).lean();
        return res.render('projectClient', { layout: false, truncs, users });
    } catch (e) {
        res.json({ msg: e.message });
    }
};

const createTruncs = async (req, res) => {
    try {
        const { project, developer, client, status } = req.body; 
        const newTruncs = new Truncs({ project, developer, client, status });
        await newTruncs.save();
        return res.json(newTruncs);
    } catch (e) {
        return res.json({ msg: e.message });
    }
};
const getAllTruncsforUser = async (req, res) => {
    try {
        const truncs = await Truncs.find({ developer: req.user.username }).lean();
        return res.render('projectforNormaleUser', { layout: false, truncs: truncs });
    } catch (e) {
        res.json({ msg: e });
    }
};

const getOneTruncs = async (req, res) => {
    try {
        const truncs = await Truncs.findById(req.params.id).lean();
        if (!truncs) {
            return res.status(404).send("Project not found");
        }
        return res.render('editProject', { truncs, layout: false });
    } catch (e) {
        res.json({ msg: e.message });
    }
};

const updatTruncs = async (req, res) => {
    const allowedUpdates = ['project', 'developer', 'client', 'status'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const truncs = await Truncs.findById(req.params.id);
        if (!truncs) {
            return res.status(404).send({ error: 'Project not found' });
        }
        updates.forEach(update => truncs[update] = req.body[update]);
        await truncs.save();
        res.json({ msg: 'Project updated successfully', data: truncs });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

const deleteTruncs = async (req, res) => {
    try {
        await Truncs.findByIdAndDelete(req.params.id);
        return res.json({ msg: "Project deleted successfully" });
    } catch (e) {
        res.json({ msg: e.message });
    }
};

module.exports = { createTruncs, getAllTruncs, updatTruncs, deleteTruncs, getOneTruncs, getAllTruncsforUser };
