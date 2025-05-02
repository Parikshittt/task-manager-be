const { Pool } = require('pg');
require('dotenv').config();

console.log('Database connection attempt with:', {
    hasConnectionString: !!process.env.DATABASE_URL,
    connectionStringLength: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Add event listeners for connection issues
pool.on('error', (err) => {
    console.error('Unexpected database error:', {
        error: err.message,
        stack: err.stack
    });
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection test failed:', {
            error: err.message,
            stack: err.stack
        });
    } else {
        console.log('Database connection successful:', res.rows[0]);
    }
});

module.exports = pool;
