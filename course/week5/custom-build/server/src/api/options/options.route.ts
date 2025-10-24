import express from 'express';
import * as optionsController from './options.controller.js';

const router = express.Router();

// GET /api/options - Get all options at once
router.get('/', optionsController.getAllOptions);

// GET /api/options/exterior-colors - Get all exterior colors
router.get('/exterior-colors', optionsController.getExteriorColors);

// GET /api/options/interior-colors - Get all interior colors
router.get('/interior-colors', optionsController.getInteriorColors);

// GET /api/options/body-styles - Get all body styles
router.get('/body-styles', optionsController.getBodyStyles);

// GET /api/options/wheels - Get all wheels
router.get('/wheels', optionsController.getWheels);

// GET /api/options/performance-packages - Get all performance packages
router.get('/performance-packages', optionsController.getPerformancePackages);

export default router;

