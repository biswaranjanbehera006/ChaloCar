import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const carData = location?.state?.car;
    if (carData) {
      setCarDetails(carData);
      localStorage.setItem('bookedCar', JSON.stringify(carData));
    } else {
      const saved = localStorage.getItem('bookedCar');
      if (saved) setCarDetails(JSON.parse(saved));
    }

    const timeout = setTimeout(() => {
      localStorage.removeItem('bookedCar');
    }, 5 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  const handlePrint = () => window.print();

  if (!carDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-700 animate-pulse">Loading booking info...</div>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-purple-700 p-4 text-white text-center text-xl font-bold z-10 relative">
        Booking Confirmation
      </nav>

      {/* Background Video */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/bg-video.mp4"
        />
      </div>

      {/* Booking Confirmation Box */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl text-white w-full max-w-xl"

        >
          <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed ✅</h2>
          <p className="text-white-700 mb-4">Your booking was successfully processed!</p>

          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 text-left text-white mb-4">

            <h3 className="text-lg font-semibold text-green-500 mb-2">Car Details:</h3>
            <p><span className="font-medium">Model:</span> {carDetails.make} {carDetails.model}</p>
            <p><span className="font-medium">Fuel Type:</span> {carDetails.fuelType}</p>
            <p><span className="font-medium">Seats:</span> {carDetails.seats}</p>
            <p><span className="font-medium">Price/Day:</span> ₹{carDetails.pricePerDay}</p>
          </div>

          <p className="text-white-800 font-semibold mb-2">Bring these documents:</p>
          <ul className="list-disc text-left ml-6 text-white mb-4">
            <li>Aadhar Card</li>
            <li>Driving Licence</li>
            <li>4 Passport Size Photos</li>
          </ul>

          <p className="text-sm text-white mb-2">
            📍 Plot No-220, Rasulgarh, Bhubaneswar<br />
            PIN - 751003, Odisha, India
          </p>

          <p className="text-green-600 font-medium mb-6">
            🚗 Please pick up your car at the office during working hours.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition"
            >
              Go to Home
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Print Receipt
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default BookingSuccess;
