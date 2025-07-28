const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    },

    // 🕒 DateTime fields for booking period
    pickupDateTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: 'Pickup time must be in the future.'
      }
    },
    returnDateTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return this.pickupDateTime < value;
        },
        message: 'Return time must be after pickup time.'
      }
    },

    // ⏳ Optional: Booking duration and billing
    durationHours: {
      type: Number,
      required: false
    },
    totalPrice: {
      type: Number,
      required: false
    },

    // 🚦 Booking status
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending'
    },

    // ✅ New user details for each booking
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// 📅 Index for filtering by date
bookingSchema.index({ pickupDateTime: 1, returnDateTime: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
