// src/api/cars/cars.route.ts
import { Router } from 'express';
import { handleGetAllCars, handleGetCarById } from './cars.controller.js';
const carRoutes = Router();
// Maps HTTP GET /api/cars/ to the handleGetAllCars controller
carRoutes.get('/', handleGetAllCars);
// Maps HTTP GET /api/cars/:id to the handleGetCarById controller
carRoutes.get('/:id', handleGetCarById);
// POST, PUT, DELETE routes would go here as well
export default carRoutes;
