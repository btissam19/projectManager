const { Task } = require("../database/mongo");

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id }).lean();
        return res.render('addtaks', { 
            layout: false,
            tasks: tasks
        });
    } catch (e) {
        res.json({ msg: e });
    }
}
const createNewTask = async (req, res) => {
    try {
        const { name } = req.body;
        const newTask = new Task({ 
            name, 
            completed: false, 
            user: req.user._id
        });
        await newTask.save();
        res.json({ task: newTask });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}
const getSingleTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId).lean();
        
        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.render('editTask', { task: task, layout: false });
    } catch (e) {
        res.status(500).send('Server Error');
    }
}

const editTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.json({ msg: 'Task updated successfully', task });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        return res.render('addtaks', { layout: false , msg: "task deleted successfully" });
    } catch (e) {
        console.log(e);
        return res.render('addtaks', { layout: false , msg: "failed to delete task" });
    }
}

module.exports = { deleteTask,editTask,getSingleTask,createNewTask,getAllTask};
