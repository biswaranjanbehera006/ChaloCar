const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const getUserId = (user) =>
  user?._id?.toString() || user?.id?.toString() || user?.userId?.toString();

// ✅ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const {
      car,
      pickupDateTime,
      returnDateTime,
      fullName,
      email,
      mobile,
      location,
    } = req.body;

    const loggedInId = getUserId(req.user);

    if (!car || !pickupDateTime || !returnDateTime || !fullName || !mobile || !location || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const booking = await Booking.create({
      user: loggedInId,
      car,
      pickupDateTime,
      returnDateTime,
      fullName,
      email,
      mobile,
      location,
      status: 'pending',
    });

    const user = await User.findById(loggedInId);
    const bookedCar = await Car.findById(car);

    await sendEmail({
      to: user.email,
      subject: '📥 Booking Request Submitted',
      html: `
        <h3 style="color: green;">Booking Request Submitted</h3>
        <p>Dear ${user.name || user.username || 'User'},</p>
        <p>Your booking for <strong>${bookedCar.make} ${bookedCar.model}</strong> has been received.</p>
        <p><strong>Pickup:</strong> ${new Date(pickupDateTime).toLocaleString()}<br/>
        <strong>Return:</strong> ${new Date(returnDateTime).toLocaleString()}</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Full Name: ${fullName}</li>
          <li>Email: ${email}</li>
          <li>Mobile: ${mobile}</li>
          <li>Location: ${location}</li>
        </ul>
        <p>You will be notified once your booking is approved.</p>
      `,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// ✅ Get All Bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name username email")
      .populate("car")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

// ✅ Get User's Own Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = getUserId(req.user);
    const bookings = await Booking.find({ user: userId })
      .populate('car')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
  }
};

// ✅ Cancel Booking (User or Admin)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const loggedInId = getUserId(req.user);
    if (req.user.role !== 'admin' && booking.user._id.toString() !== loggedInId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    await booking.deleteOne();

    await sendEmail({
      to: booking.user.email,
      subject: '❌ Booking Cancelled',
      html: `
        <h3 style="color: red;">Booking Cancelled</h3>
        <p>Dear ${booking.user.name || booking.user.username || 'User'},</p>
        <p>Your booking for <strong>${booking.car.make} ${booking.car.model}</strong> has been cancelled.</p>
        <p>If you have questions, contact <a href="mailto:support@yourapp.com">support@yourapp.com</a>.</p>
      `
    });

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

// ✅ Approve Booking
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'approved';
    await booking.save();

    await sendEmail({
      to: booking.user.email,
      subject: '✅ Booking Approved',
      html: `
        <h3 style="color: green;">Booking Approved</h3>
        <p>Dear ${booking.user.name || booking.user.username || 'User'},</p>
        <p>Your booking for <strong>${booking.car.make} ${booking.car.model}</strong> has been approved.</p>
        <p><strong>Pickup:</strong> ${new Date(booking.pickupDateTime).toLocaleString()}<br/>
        <strong>Return:</strong> ${new Date(booking.returnDateTime).toLocaleString()}</p>
        <p>Thanks for choosing CarRental!</p>
      `
    });

    res.json({ message: 'Booking approved', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error approving booking', error: error.message });
  }
};

// ✅ Decline Booking
exports.declineBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('car user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'declined';
    await booking.save({ validateBeforeSave: false });

    if (booking.user?.email) {
      await sendEmail({
        to: booking.user.email,
        subject: '🚫 Booking Declined',
        html: `
          <h3 style="color: red;">Booking Declined</h3>
          <p>Dear ${booking.user.name || booking.user.username || 'User'},</p>
          <p>Your booking for <strong>${booking.car.make} ${booking.car.model}</strong> has been declined.</p>
          <p>If you have questions, contact <a href="mailto:support@yourapp.com">support@yourapp.com</a>.</p>
        `
      });
    }

    res.json({ message: 'Booking declined', booking });
  } catch (error) {
    console.error("❌ Error declining booking:", error);
    res.status(500).json({ message: 'Error declining booking', error: error.message });
  }
};

// ✅ Delete Booking (Admin Only)
exports.deleteBooking = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete bookings.' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();

    res.json({ message: 'Booking deleted successfully by admin' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};
