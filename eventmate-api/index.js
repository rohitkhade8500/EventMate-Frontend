const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); 

const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('EventMate API is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
