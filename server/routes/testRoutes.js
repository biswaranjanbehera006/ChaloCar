const express = require('express');
const router = express.Router();
const { sendTestEmail } = require('../controllers/testController');

// Updated: Use POST for sending email
router.post('/email', sendTestEmail);

module.exports = router;