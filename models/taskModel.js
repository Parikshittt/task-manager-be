const pool = require('../db');

async function getAllTasks() {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
}

async function getTaskById(id) {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
}

async function createTask(taskData) {
    const { project_id, title, description, assignee_id, status, priority, due_date } = taskData;
    
    const result = await pool.query(
        'INSERT INTO tasks (project_id, title, description, assignee_id, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [project_id, title, description, assignee_id, status, priority, due_date]
    );
    
    return result.rows[0];
}

async function updateTask(id, taskData) {
    const { project_id, title, description, assignee_id, status, priority, due_date } = taskData;
    
    const result = await pool.query(
        'UPDATE tasks SET project_id = $1, title = $2, description = $3, assignee_id = $4, status = $5, priority = $6, due_date = $7 WHERE id = $8 RETURNING *',
        [project_id, title, description, assignee_id, status, priority, due_date, id]
    );
    
    return result.rows[0];
}

async function deleteTask(id) {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};