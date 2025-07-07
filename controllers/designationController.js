const designationModel = require('../models/designationModel');

async function getAllDesignations(req, res) {
    try {
        const designations = await designationModel.getAllDesignations();
        res.json({ designations });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getAllDesignations
}
