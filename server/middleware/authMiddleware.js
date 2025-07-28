// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Middleware to protect private routes
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.log("❌ User not found for decoded ID:", decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('❌ Auth Error:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

// ✅ Middleware for admin-only access
const adminOnly = (req, res, next) => {
  if (!req.user) {
    console.log("❌ Forbidden: No user found in request");
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  if (req.user.role !== 'admin') {
    console.log(`❌ Forbidden: Admin only. Current role: ${req.user.role}`);
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};

// ✅ Middleware for user-only access
const userOnly = (req, res, next) => {
  if (!req.user) {
    console.log("❌ Forbidden: No user found in request");
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  if (req.user.role !== 'user') {
    console.log(`❌ Forbidden: User only. Current role: ${req.user.role}`);
    return res.status(403).json({ message: 'User access only' });
  }

  next();
};

module.exports = { protect, adminOnly, userOnly };
