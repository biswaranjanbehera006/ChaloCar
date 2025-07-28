import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from '../components/Footer';

const Bookings = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.error('Error fetching car:', err);
      }
    };
    fetchCar();
  }, [id]);

  const getTotalPrice = () => {
    if (!startDate || !endDate || !car) return 0;
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    return days * car.pricePerDay;
  };

  const validateFields = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required.';
    if (!location.trim()) newErrors.location = 'Pickup location is required.';
    if (!startDate) newErrors.startDate = 'Start date is required.';
    if (!endDate) newErrors.endDate = 'End date is required.';
    if (!pickupTime) newErrors.pickupTime = 'Pickup time is required.';
    if (!returnTime) newErrors.returnTime = 'Return time is required.';
    return newErrors;
  };

  const handleBooking = async () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const pickupDateTime = new Date(startDate);
    const [pickupHour, pickupMin] = pickupTime.split(':');
    pickupDateTime.setHours(pickupHour, pickupMin);

    const returnDateTime = new Date(endDate);
    const [returnHour, returnMin] = returnTime.split(':');
    returnDateTime.setHours(returnHour, returnMin);

    const now = new Date();
    if (pickupDateTime <= now) {
      alert('Pickup time must be in the future.');
      return;
    }
    if (returnDateTime <= pickupDateTime) {
      alert('Return time must be after pickup time.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to continue.');
        return;
      }

      setLoading(true);

      const bookingData = {
        car: car._id,
        pickupDateTime: pickupDateTime.toISOString(),
        returnDateTime: returnDateTime.toISOString(),
        fullName,
        email,
        mobile,
        location,
      };

      const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201 || response.status === 200) {
        navigate('/booking-success', { state: { car } });
      } else {
        alert('Booking failed, try again.');
      }
    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      alert('Error processing booking.');
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <div className="p-6 text-center text-lg">Loading car details...</div>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video autoPlay muted loop playsInline className="fixed inset-0 w-full h-full object-cover z-[-2]">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[-1]" />

      {/* Content */}
      <div className="relative z-10 px-4 py-10 mt-28">
        <div className="max-w-5xl mx-auto bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg p-8 space-y-6 text-white">
          {/* Car Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={car.image} alt={car.model} className="w-full h-64 object-cover rounded-lg shadow" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">{car.make} {car.model} ({car.year})</h3>
              <p>Fuel: {car.fuelType}</p>
              <p>Seats: {car.seats}</p>
              <p className="text-blue-300 font-bold text-lg">₹{car.pricePerDay} / day</p>
              <p className="text-emerald-400 font-medium">Estimated Total: ₹{getTotalPrice()}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ label: 'Full Name', value: fullName, set: setFullName, name: 'fullName' },
              { label: 'Email Address', value: email, set: setEmail, name: 'email' },
              { label: 'Mobile Number', value: mobile, set: setMobile, name: 'mobile' },
              { label: 'Pickup Location', value: location, set: setLocation, name: 'location' }]
              .map(({ label, value, set, name }) => (
                <div key={name} className="flex flex-col">
                  <label className="mb-1 font-medium">{label}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="p-3 rounded-md bg-white/80 text-black"
                    required
                  />
                  {errors[name] && <span className="text-red-400 text-sm mt-1">{errors[name]}</span>}
                </div>
              ))}

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Start Date</label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="p-3 rounded-md bg-white/80 text-black" />
              {errors.startDate && <span className="text-red-400 text-sm mt-1">{errors.startDate}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">End Date</label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="p-3 rounded-md bg-white/80 text-black" />
              {errors.endDate && <span className="text-red-400 text-sm mt-1">{errors.endDate}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Pickup Time</label>
              <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="p-3 rounded-md bg-white/80 text-black" required />
              {errors.pickupTime && <span className="text-red-400 text-sm mt-1">{errors.pickupTime}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Return Time</label>
              <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className="p-3 rounded-md bg-white/80 text-black" required />
              {errors.returnTime && <span className="text-red-400 text-sm mt-1">{errors.returnTime}</span>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button onClick={() => setShowSummary(true)} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition">
              Preview Summary
            </button>
            <button
              onClick={handleBooking}
              disabled={loading}
              className={`px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>

        {/* Booking Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white/90 p-8 rounded-lg w-96 backdrop-blur-lg border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-black">Booking Summary</h3>
              <ul className="space-y-2 text-black text-sm">
                <li><strong>Car:</strong> {car.make} {car.model}</li>
                <li><strong>Pickup:</strong> {startDate?.toLocaleDateString()} {pickupTime}</li>
                <li><strong>Return:</strong> {endDate?.toLocaleDateString()} {returnTime}</li>
                <li><strong>Name:</strong> {fullName}</li>
                <li><strong>Email:</strong> {email}</li>
                <li><strong>Mobile:</strong> {mobile}</li>
                <li><strong>Location:</strong> {location}</li>
                <li><strong>Total:</strong> ₹{getTotalPrice()}</li>
              </ul>
              <div className="mt-4 text-right">
                <button onClick={() => setShowSummary(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Bookings;
