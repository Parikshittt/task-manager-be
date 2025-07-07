const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const designationRoutes = require('./routes/designationRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(express.json());
// Configure CORS for both development and production
app.use(cors({
  origin: [
    'http://localhost:5173', // Development frontend
    'https://task-manager-fe-dun.vercel.app', // Production frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/roles', rolesRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Task Manager API is live 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
