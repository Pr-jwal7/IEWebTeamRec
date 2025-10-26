const express = require('express');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');
const router = express.Router();
// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check user existence AND compare password using the method defined in the UserModel
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // The JWT token is returned here
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// @route   POST /api/users/register
router.post('/register', async (req, res) => {
    const { name, email, password, isAdmin = true } = req.body;

    // Simple check to ensure only one admin is created initially
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, isAdmin });

    if (user) {
        res.status(201).json({ message: 'Admin user created successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

module.exports = router;