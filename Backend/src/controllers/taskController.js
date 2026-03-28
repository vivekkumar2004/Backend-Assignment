const taskModel = require("../models/taskModel");

// Get User's Tas
async function getTasks(req, res){
    try {
        let tasks;

        if (req.user.role === 'admin') {
            tasks = await taskModel.find({}).populate("user", "username email");
        } else {
            tasks = await taskModel.find({ user: req.user.id });
        }

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create Task 
async function createTask(req, res){
    try {
        const { title, description } = req.body;
        const newTask = await taskModel.create({
            title,
            description,
            user: req.user.id 
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Task
async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        // Sirf wahi task update ho jo is user ka ho (Security!)
        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: id, user: req.user.id }, 
            { title, description, status },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Task
async function deleteTask(req, res){
    try {
        const { id } = req.params;
        let query;

        if (req.user.role === 'admin') {
            query = { _id: id };
        } else {
            query = { _id: id, user: req.user.id };
        }

        const deletedTask = await taskModel.findOneAndDelete(query);

        if (!deletedTask) {
            return res.status(404).json({ 
                message: "Task not found or you don't have permission to delete it." 
            });
        }

        res.status(200).json({ 
            message: req.user.role === 'admin' 
                ? "Task deleted by Admin successfully" 
                : "Your task has been deleted successfully" 
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}