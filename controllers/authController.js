const pool = require('../db');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, role, managerId, username, password } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO users (name, role, manager_id, username, password)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, role, managerId, username, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });

    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user: user.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { signup, login };