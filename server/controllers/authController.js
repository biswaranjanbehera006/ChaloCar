const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 🔐 Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// 📝 Register User
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();

    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({
      token,
      user: {
        _id: newUser._id, // ✅ Always return _id (not id) for consistency with MongoDB
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// 🔐 Login User (with username)
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      token,
      user: {
        _id: user._id, // ✅ Consistent naming
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// 📧 Step 1: Forgot Password - Verify Email
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No user found with that email' });

    res.status(200).json({ message: 'Email verified. You may now reset your password.' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Server error during email verification' });
  }
};

// 🔄 Step 2: Reset Password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

// ✅ Export All
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
