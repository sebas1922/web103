import { findAllCars, findCarById } from './cars.service.js';
export const handleGetAllCars = async (req, res) => {
    try {
        const cars = await findAllCars();
        res.status(200).json(cars);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const handleGetCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Input parsing
        if (isNaN(id)) { // Input validation
            return res.status(400).json({ message: 'Invalid ID supplied' });
        }
        const car = await findCarById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
