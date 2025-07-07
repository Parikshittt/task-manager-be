const pool = require('../db');

async function getAllRoles() {
    const result = await pool.query('SELECT * FROM roles');
    return result.rows;
}

module.exports = {
    getAllRoles
}