const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login with username and password
router.post('/login', loginUser);

// Verify email before password reset
router.post('/forgot-password', forgotPassword);

// Reset password using verified email
router.post('/reset-password', resetPassword);

module.exports = router;
