const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // <-- 1. You imported this

// --- Import Routes ---
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

// Load environment variables from .env file
dotenv.config();

// Connect to Database
connectDB();

// Initialize the express app
const app = express();

// Set the port
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors()); // <-- 2. YOU MUST ADD THIS LINE
app.use(express.json()); // This was already here

// --- Basic Test Route ---
app.get('/', (req, res) => {
  res.send('EventMate API is running!');
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});