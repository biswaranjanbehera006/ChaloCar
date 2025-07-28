const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const testRoutes = require('./routes/testRoutes'); // Optional test route
const adminRoutes = require('./routes/adminRoutes');


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/test', testRoutes);
app.use('/api/admin', adminRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚗 Car Rental System API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
