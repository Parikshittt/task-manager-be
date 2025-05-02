const pool = require('../db');
const taskModel = require('../models/taskModel');

async function getAllTasks(req, res) {
    try {
        const tasks = await taskModel.getAllTasks();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        const task = await taskModel.getTaskById(id);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

async function createTask(req, res) {
    try {
        const taskData = req.body;
        const newTask = await taskModel.createTask(taskData);
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const taskData = req.body;
        
        const task = await taskModel.getTaskById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        const updatedTask = await taskModel.updateTask(id, taskData);
        res.json(updatedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        
        const task = await taskModel.getTaskById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        const deletedTask = await taskModel.deleteTask(id);
        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};