const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Example protected admin route
router.get('/dashboard-data', protect, adminOnly, (req, res) => {
  res.json({ message: 'Welcome Admin. Here is your dashboard data.' });
});

module.exports = router;
