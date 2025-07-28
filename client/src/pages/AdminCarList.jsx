import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';

const AdminCarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please log in again.');
        return;
      }
      const res = await axios.get('https://chalocar.onrender.com/api/cars', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) {
        setCars(res.data);
      } else {
        setError('Unexpected response format from server.');
      }
    } catch (err) {
      setError('Failed to fetch cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://chalocar.onrender.com/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCars();
      } catch (err) {
        alert('Failed to delete car.');
      }
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      {/* Background Video and Overlay */}
      <div className="fixed inset-0 z-[-10] w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://chalocar.onrender.com/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm"></div>
      </div>

      {/* Navbar */}
      <nav className="bg-[#2a004f] text-white px-6 py-4 shadow-md relative z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Car Management</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/admin-dashboard')}
              className="bg-purple-600 hover:bg-purple-700 transition rounded-full"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => navigate('/admin/cars/new')}
              className="bg-green-600 hover:bg-green-700 transition rounded-full"
            >
              + Add New Car
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen px-6 py-8 text-white relative z-10">
        {loading && <p className="text-blue-300">Loading cars...</p>}
        {error && <p className="text-red-400 mt-2">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all text-white"
            >
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold text-purple-300">
                {car.brand} {car.model}
              </h2>
              <p className="text-sm text-gray-200">Year: {car.year}</p>
              <p className="text-sm text-gray-200">Fuel Type: {car.fuelType}</p>
              <p className="text-sm text-gray-200">Seats: {car.seats}</p>
              <p className="text-md font-medium text-green-300 mt-1">
                ₹{car.pricePerDay} / day
              </p>

              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => navigate(`/admin/cars/edit/${car._id}`)}
                  className="bg-purple-500 hover:bg-purple-600 text-white w-full transition shadow-lg shadow-purple-500/30 rounded-full"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteCar(car._id)}
                  className="bg-green-500 hover:bg-green-600 text-white w-full transition shadow-lg shadow-green-500/30 rounded-full"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {!loading && cars.length === 0 && !error && (
          <p className="text-center text-gray-100 mt-10">No cars available in the system.</p>
        )}
      </main>

      <Footer />
    </>
  );
};

export default AdminCarList;
