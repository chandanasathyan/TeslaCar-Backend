const express = require('express');
const { getAllCars, createCar, getCarById } = require('../Controllers/Car/CarController');
const router = express.Router()

router.get("/cars", getAllCars)
router.post("/cars", createCar)
router.get("/cars/:id", getCarById)

module.exports = router