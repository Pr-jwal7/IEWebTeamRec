const express = require('express');
const Student = require('../models/StudentModel'); 
// 1. IMPORT the Auth Middleware:
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all students
// @route   GET /api/students
router.get('/', async (req, res) => {
    try {
        // Find all documents in the Student collection
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a new student (Requires valid JWT AND Admin privileges)
// @route   POST /api/students

// 2. APPLY the middleware: protect runs first (checks token), then admin runs (checks isAdmin: true)
router.post('/', protect, admin, async (req, res) => {
    // Destructure the required fields from the request body
    const { name, studentId, email, major, currentYear } = req.body;

    // Basic server-side validation
    if (!name || !studentId || !email) {
        return res.status(400).json({ message: 'Name, Student ID, and Email are required fields.' });
    }

    try {
        // Create a new Student document
        const student = new Student({ name, studentId, email, major, currentYear });
        const createdStudent = await student.save();

        // Respond with the created student and a 201 status (Created)
        res.status(201).json(createdStudent);
    } catch (error) {
        // Handle duplicate key error (e.g., if studentId or email already exists)
        if (error.code === 11000) {
             return res.status(400).json({ message: 'A student with this ID or Email already exists.' });
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;