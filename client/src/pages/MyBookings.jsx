import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarCheck2, XCircle, Phone, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    if (!token) {
      setError('User not logged in or token missing.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`https://chalocar.onrender.com/api/bookings/user`, {  //chnage by me
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setCancelingId(bookingId);

    try {
      await axios.delete(`https://chalocar.onrender.com/api/bookings/${bookingId}`, { //change by me
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert('Error cancelling booking.');
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <CalendarCheck2 className="w-7 h-7 text-indigo-600" />
          My Bookings
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 flex justify-center items-center h-64 text-lg font-medium text-center px-4">
            ⚠️ {error}
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500 text-center text-lg font-medium">
            You have no bookings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <Card
                key={booking._id}
                className="rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition duration-300"
              >
                {booking.car?.image && (
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.make} ${booking.car.model}`}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                )}
                <CardContent className="p-5 space-y-3 text-sm text-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {booking.car?.make} {booking.car?.model}
                  </h3>

                  <div className="grid gap-1 text-gray-600">
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-500" />
                      <span><strong>Name:</strong> {booking.fullName}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span><strong>Mobile:</strong> {booking.mobile}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span><strong>Location:</strong> {booking.location}</span>
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>From:</strong>{' '}
                      {new Date(booking.pickupDateTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>To:</strong>{' '}
                      {new Date(booking.returnDateTime).toLocaleString()}
                    </p>
                  </div>

                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'declined'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </p>

                  {booking.status === 'pending' && (
                    <Button
                      onClick={() => handleCancelBooking(booking._id)}
                      variant="destructive"
                      disabled={cancelingId === booking._id}
                      className="w-full mt-3 text-sm"
                    >
                      {cancelingId === booking._id ? (
                        <span className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 animate-pulse" />
                          Cancelling...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Cancel Booking
                        </span>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookings;
