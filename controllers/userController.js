const userModel = require('../models/userModel');

// Get all users
async function getUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get user by ID
async function getUser(req, res) {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Create new user
async function createUser(req, res) {
    try {
        const newUser = await userModel.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Update user
async function updateUser(req, res) {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        if (!updatedUser) return res.status(404).send('User not found');
        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Delete user
async function deleteUser(req, res) {
    try {
        await userModel.deleteUser(req.params.id);
        res.send('User deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
