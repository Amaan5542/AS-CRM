const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; // 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        // Verify token using secret key from environment variables
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken; // Attach decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ message: "Invalid or expired token", error: err.message });
    }
};

// Admin-only middleware (To restrict access to only admins)
exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
