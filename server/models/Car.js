// server/models/Car.js

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },        // ✅ Brand like "Toyota"
  model: { type: String, required: true },       // ✅ Model like "Corolla"
  year: { type: Number, required: true },        // ✅ Year like 2023
  fuelType: { type: String, required: true },    // ✅ e.g., Petrol, Diesel, Electric
  seats: { type: Number, required: true },       // ✅ Number of seats
  pricePerDay: { type: Number, required: true }, // ✅ Rental price
  image: { type: String, required: false },      // ✅ Cloudinary image URL
  availability: { type: Boolean, default: true },// ✅ Optional availability
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
