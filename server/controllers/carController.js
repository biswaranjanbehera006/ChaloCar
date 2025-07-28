const Car = require('../models/Car');
const cloudinary = require('cloudinary').v2;

// ✅ Get all cars (Public - user & admin) with search
exports.getAllCars = async (req, res) => {
  try {
    const { search, make, model, fuelType, seats } = req.query;
    const query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { make: regex },
        { model: regex },
        { fuelType: regex },
      ];
    }

    if (make) query.make = new RegExp(make, 'i');
    if (model) query.model = new RegExp(model, 'i');
    if (fuelType) query.fuelType = new RegExp(fuelType, 'i');
    if (seats) query.seats = parseInt(seats);

    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};

// ✅ Get a single car by ID (Public)
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car', error: error.message });
  }
};

// ✅ Add a new car with image upload (Admin only)
exports.addCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can add cars' });
    }

    const { make, model, year, fuelType, seats, pricePerDay, available } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'car-rental/cars',
    });

    const newCar = new Car({
      make,
      model,
      year,
      fuelType,
      seats,
      pricePerDay,
      available: available === 'true' || available === true,
      image: result.secure_url,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: 'Error creating car', error: error.message });
  }
};

// ✅ Update a car with optional image upload (Admin only)
exports.updateCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can update cars' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    // If image file is sent, upload to Cloudinary and update
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'car-rental/cars',
      });
      req.body.image = result.secure_url;
    }

    if (req.body.available !== undefined) {
      req.body.available = req.body.available === 'true' || req.body.available === true;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: 'Error updating car', error: error.message });
  }
};

// ✅ Delete a car (Admin only)
exports.deleteCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete cars' });
    }

    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Car not found' });

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error: error.message });
  }
};
