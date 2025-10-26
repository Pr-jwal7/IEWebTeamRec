
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


dotenv.config();
const app = express();
// Enable Cross-Origin Resource Sharing
app.use(cors()); 

app.use(express.json());


app.get('/', (req, res) => {
    res.send("API is running...");
});

// Database Connection & Port Setup
const PORT = process.env.PORT || 5000;

const connectDB = require('./db');
// Import the student routes
const studentRoutes = require('./routes/studentRoutes');
// Mount the student routes at the /api/students path
app.use('/api/students', studentRoutes);

const userRoutes = require('./routes/userRoutes');

// And when mounting:
app.use('/api/users', userRoutes);

(async () => {
    try {
        // 1. Connect to the Database. This will exit the process if it fails.
        await connectDB();

        // 2. Start the Express server after a successful DB connection
        app.listen(PORT, () => {
            console.log(`Server running successfully on port ${PORT}`);
        });

    } catch (error) {
        // This catch block is mostly a fallback, as connectDB handles the exit on error
        console.error("An unexpected error occurred during startup:", error.message);
    }
})();

