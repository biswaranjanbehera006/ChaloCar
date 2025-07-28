const express = require('express');
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  approveBooking,
  declineBooking,
  deleteBooking, // Admin-only deletion
} = require('../controllers/bookingController');

const { protect, adminOnly, userOnly } = require('../middleware/authMiddleware');

// ----------------------
// ✅ USER ROUTES
// ----------------------

// Create new booking
router.post('/', protect, userOnly, createBooking);

// Get bookings of the logged-in user
router.get('/user', protect, userOnly, getUserBookings);

// Cancel user's own booking
router.delete('/:id', protect, userOnly, cancelBooking);

// ----------------------
// ✅ ADMIN ROUTES
// ----------------------

// Get all bookings
router.get('/', protect, adminOnly, getAllBookings);

// Approve a booking
router.put('/:id/approve', protect, adminOnly, approveBooking);

// Decline a booking
router.put('/:id/decline', protect, adminOnly, declineBooking);

// Delete any booking as admin
router.delete('/admin/:id', protect, adminOnly, deleteBooking);

module.exports = router;
