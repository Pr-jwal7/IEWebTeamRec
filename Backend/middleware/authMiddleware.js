const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Middleware to check for a valid JWT token
const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token is present in the header (Authorization: Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (split "Bearer <token>" and take the second part)
            token = req.headers.authorization.split(' ')[1];

            // Verify token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user based on the decoded ID and attach it to the request (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            // If successful, proceed to the next middleware or the route handler
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};


// Middleware to check if the authenticated user is an Admin
const admin = (req, res, next) => {
    // req.user comes from the 'protect' middleware above
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};


module.exports = { protect, admin };