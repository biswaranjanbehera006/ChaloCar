import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [seats, setSeats] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`https://chalocar.onrender.com/api/cars/${id}`); //change by me
        const car = res.data;
        setMake(car.make);
        setModel(car.model);
        setYear(car.year);
        setFuelType(car.fuelType);
        setSeats(car.seats);
        setPricePerDay(car.pricePerDay);
        setAvailability(car.availability ?? true);
        setExistingImage(car.image);
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Failed to load car details');
      }
    };

    if (isEdit) fetchCar();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    try {
      const formData = new FormData();
      formData.append('make', make);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('fuelType', fuelType);
      formData.append('seats', seats);
      formData.append('pricePerDay', pricePerDay);
      formData.append('availability', availability);
      if (image) formData.append('image', image);

      const config = {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      };

      if (isEdit) {
        await axios.put(`https://chalocar.onrender.com/api/cars/${id}`, formData, config);
      } else {
        await axios.post('https://chalocar.onrender.com/api/cars', formData, config);
      }

      navigate('/admin/cars');
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 z-[-10] w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm"></div>
      </div>

      {/* Form Container */}
      <div className="p-6 max-w-2xl mx-auto bg-white bg-opacity-10 text-white rounded-2xl shadow-xl mt-12 backdrop-blur-md border border-white border-opacity-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{isEdit ? 'Edit Car' : 'Add New Car'}</h2>

        <Button
  onClick={() => navigate('/admin-dashboard')}
  className="bg-green-600 text-white hover:bg-green-700 rounded-full px-4 py-2"
>
  Go to Dashboard
</Button>


        </div>

        {error && (
          <div className="bg-red-200 bg-opacity-20 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Enter Car Make"
            required
            className="w-full p-3 bg-black bg-opacity-20 rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter Car Model"
            required
            className="w-full p-3 bg-black bg-opacity-20 rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            required
            className="w-full p-3 bg-black bg-opacity-20 rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />
          <input
            type="text"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            placeholder="Fuel Type"
            required
            className="w-full p-3 bg-black bg-opacity-20 rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Number of Seats"
            required
            className="w-full p-3 bg-black bg-opacity-20 rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />
          <input
            type="number"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            placeholder="Price per Day"
            required
            className="w-full p-3 bg-black bg-opacity-20 rounded-xl border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />

          {/* Image Preview */}
          <div className="space-y-2">
            {isEdit && existingImage && !imagePreview && (
              <div>
                <p className="text-sm text-gray-300">Current Image:</p>
                <img
                  src={existingImage}
                  alt="Car"
                  className="w-40 h-24 object-cover rounded-lg"
                />
              </div>
            )}

            {imagePreview && (
              <div>
                <p className="text-sm text-green-400">New Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-24 object-cover rounded-lg"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-300"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="w-4 h-4"
            />
            Available
          </label>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-lg py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>{isEdit ? 'Updating...' : 'Adding...'}</span>
              </>
            ) : (
              <span>{isEdit ? 'Update Car' : 'Add Car'}</span>
            )}
          </Button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default CarForm;
