const { Task } = require("../database/mongo");

const getAllTask = async (req, res) => {
    try {
        // Get tasks specific to the logged-in user
        const tasks = await Task.find({}).lean();
        return res.render('taksindex', { 
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
        // Create a new task and associate it with the logged-in user
        const newTask = new Task({ 
            name, 
            completed: false, 
             // Use the authenticated user's ID
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

        res.render('task', { task: task, layout: false });
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

        // Update the task
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
        res.json({ msg: 'Task deleted successfully' });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

module.exports = {
    deleteTask,
    editTask,
    getSingleTask,
    createNewTask,
    getAllTask
};
