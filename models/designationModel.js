const pool = require('../db');

async function getAllDesignations() {
    const result = await pool.query('SELECT * FROM designations');
    return result.rows;
}

module.exports = {
    getAllDesignations
}
    