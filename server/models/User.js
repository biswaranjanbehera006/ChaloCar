// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true }, // ✅ Login with username
  email: { type: String, unique: true, required: true },     // ✅ Forgot password via email
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
