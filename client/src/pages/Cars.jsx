import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('https://chalocar.onrender.com/api/cars');// change by me
        setCars(res.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleSort = (e) => setSortBy(e.target.value);
  const handleAvailabilityChange = (e) => setAvailabilityFilter(e.target.value);
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const renderStars = (rating) => {
    if (!rating || rating <= 0) return 'No ratings yet';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return '⭐'.repeat(fullStars) + (halfStar ? '½' : '');
  };

  const filteredCars = cars
    .filter(car =>
      car.model.toLowerCase().includes(search.toLowerCase()) &&
      car.pricePerDay >= priceRange[0] &&
      car.pricePerDay <= priceRange[1] &&
      (availabilityFilter === ''
        || (availabilityFilter === 'available' && car.availability)
        || (availabilityFilter === 'unavailable' && !car.availability))
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      return 0;
    });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔁 Background Video */}
    <video
  autoPlay
  muted
  loop
  playsInline
  className="fixed inset-0 w-full h-full object-cover z-[-1]"
>
  <source src="/bg-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


      {/* 🔲 Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* 💡 Main Content */}
      <div className="relative z-10 py-10 px-4 pt-28 text-white">
        <h1 className="text-4xl font-bold text-center mb-10 underline decoration-purple-400">
          Our Available Cars
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-6 mb-10 px-4">
          <input
            type="text"
            placeholder="🔍 Search by model..."
            value={search}
            onChange={handleSearch}
            className="px-4 py-2 w-full md:w-[250px] rounded-lg bg-white/20 text-black placeholder-black shadow-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            value={sortBy}
            onChange={handleSort}
            className="px-4 py-2 w-full md:w-[200px] rounded-lg bg-white/20 text-black shadow-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <select
            value={availabilityFilter}
            onChange={handleAvailabilityChange}
            className="px-4 py-2 w-full md:w-[200px] rounded-lg bg-white/20 text-black shadow-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">All Cars</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 px-4 text-white">
          <div className="flex flex-col items-start">
            <label className="text-sm font-semibold">Min Price</label>
            <input
              type="range"
              min={0}
              max={20000}
              step={100}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-[150px]"
            />
            <p className="text-sm font-bold">₹{priceRange[0]}</p>
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm font-semibold">Max Price</label>
            <input
              type="range"
              min={0}
              max={20000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-[150px]"
            />
            <p className="text-sm font-bold">₹{priceRange[1]}</p>
          </div>
        </div>

        {/* Car Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 transition-all duration-500">
          {filteredCars.map(car => (
            <div
              key={car._id}
              className="bg-white/20 backdrop-blur-lg text-white p-5 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{car.make} {car.model}</h2>
              <p>🛠️ Year: <span className="font-semibold">{car.year}</span></p>
              <p>⛽ Fuel: <span className="font-semibold">{car.fuelType}</span></p>
              <p>🪑 Seats: <span className="font-semibold">{car.seats}</span></p>
              <p>💸 Price/Day: <span className="font-bold text-green-300">₹{car.pricePerDay}</span></p>
              <p className="mt-2">Rating: <span className="font-medium">{renderStars(car.rating)}</span></p>
              {car.review && (
                <p className="text-sm italic mt-1">“{car.review}”</p>
              )}
              <p className={`mt-2 font-bold ${car.availability ? 'text-green-300' : 'text-red-400'}`}>
                {car.availability ? '✔️ Available' : '❌ Not Available'}
              </p>
              {car.availability && (
                <button
                  onClick={() => navigate(`/book/${car._id}`)}
                  className="mt-4 w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300"
                >
                  🚗 Book Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
