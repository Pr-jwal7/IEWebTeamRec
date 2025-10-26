
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

/**
 * @function connectDB
 * @description Establishes a connection to the MongoDB database.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to the database using the URI
        await mongoose.connect(URI);
        console.log("Connection successful to DB");
    } catch (error) {
        // Log an error if the connection fails
        console.error("Database connection failed:", error.message);

        // Exit the process with failure code (0) if the connection cannot be established
        process.exit(0);
    }
};

module.exports = connectDB;
