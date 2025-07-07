const rolesModel = require('../models/rolesModel');

async function getAllRoles(req, res) {
    try {
        const roles = await rolesModel.getAllRoles();
        res.json(roles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getAllRoles
}