const pool = require('../db');

async function getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

async function getUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

async function createUser({ id, name, role, managerId }) {
    const result = await pool.query(
        `INSERT INTO users (id, name, role, manager_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
        [id, name, role, managerId]
    );
    return result.rows[0];
}

async function updateUser(id, { name, role, managerId }) {
    const result = await pool.query(
        `UPDATE users
       SET name = $1, role = $2, manager_id = $3
       WHERE id = $4
       RETURNING *`,
        [name, role, managerId, id]
    );
    return result.rows[0];
}

async function deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};