const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars (only needed if you're not loading it in index.js)
dotenv.config();

const connectDB = async () => {
  try {
    // Mongoose.connect() returns a promise
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;