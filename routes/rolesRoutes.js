const express = require('express');
const router = express.Router();
const { getAllRoles } = require('../controllers/rolesController');

// Routes
router.get('/', getAllRoles);

module.exports = router;