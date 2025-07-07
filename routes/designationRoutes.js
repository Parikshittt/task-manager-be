const express = require('express');
const router = express.Router();
const { getAllDesignations } = require('../controllers/designationController');

// Routes
router.get('/', getAllDesignations);

module.exports = router;