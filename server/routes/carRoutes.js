const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // ✅ Multer upload middleware

// ✅ Public Routes
router.get('/', getAllCars);
router.get('/:id', getCarById);

// ✅ Admin-only Routes
router.post('/', protect, adminOnly, upload.single('image'), addCar);

// ✅ Update car route with optional image update
router.put('/:id', protect, adminOnly, upload.single('image'), updateCar);

// ✅ Delete car
router.delete('/:id', protect, adminOnly, deleteCar);

module.exports = router;
