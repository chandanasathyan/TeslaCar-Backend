const { response } = require("express")
const Car = require("../../Model/CarModel")

// Create a new car
const createCar = async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (err) {
        res.status(400).json({ message: "Error creating car", error: err.message });
    }
};

// Get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cars", error: err.message });
    }
};

// Get a car by ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ message: "Error fetching car", error: err.message });
    }
};

module.exports = { createCar, getAllCars, getCarById }