// controllers/userController.js
const User = require('../models/User');

// ✅ Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // remove password field
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ✅ Delete a user by ID (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
