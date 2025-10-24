import { Request, Response } from 'express';
import * as optionsService from './options.service.js';

/**
 * GET /api/options/exterior-colors
 * Fetch all exterior color options
 */
export const getExteriorColors = async (req: Request, res: Response): Promise<void> => {
    try {
        const colors = await optionsService.findAllExteriorColors();
        res.status(200).json(colors);
    } catch (error: any) {
        console.error('Error fetching exterior colors:', error);
        res.status(500).json({ error: 'Failed to fetch exterior colors', message: error.message });
    }
};

/**
 * GET /api/options/interior-colors
 * Fetch all interior color options
 */
export const getInteriorColors = async (req: Request, res: Response): Promise<void> => {
    try {
        const colors = await optionsService.findAllInteriorColors();
        res.status(200).json(colors);
    } catch (error: any) {
        console.error('Error fetching interior colors:', error);
        res.status(500).json({ error: 'Failed to fetch interior colors', message: error.message });
    }
};

/**
 * GET /api/options/body-styles
 * Fetch all body style options
 */
export const getBodyStyles = async (req: Request, res: Response): Promise<void> => {
    try {
        const styles = await optionsService.findAllBodyStyles();
        res.status(200).json(styles);
    } catch (error: any) {
        console.error('Error fetching body styles:', error);
        res.status(500).json({ error: 'Failed to fetch body styles', message: error.message });
    }
};

/**
 * GET /api/options/wheels
 * Fetch all wheel options
 */
export const getWheels = async (req: Request, res: Response): Promise<void> => {
    try {
        const wheels = await optionsService.findAllWheels();
        res.status(200).json(wheels);
    } catch (error: any) {
        console.error('Error fetching wheels:', error);
        res.status(500).json({ error: 'Failed to fetch wheels', message: error.message });
    }
};

/**
 * GET /api/options/performance-packages
 * Fetch all performance package options
 */
export const getPerformancePackages = async (req: Request, res: Response): Promise<void> => {
    try {
        const packages = await optionsService.findAllPerformancePackages();
        res.status(200).json(packages);
    } catch (error: any) {
        console.error('Error fetching performance packages:', error);
        res.status(500).json({ error: 'Failed to fetch performance packages', message: error.message });
    }
};

/**
 * GET /api/options
 * Fetch all options at once
 */
export const getAllOptions = async (req: Request, res: Response): Promise<void> => {
    try {
        const options = await optionsService.findAllOptions();
        res.status(200).json(options);
    } catch (error: any) {
        console.error('Error fetching all options:', error);
        res.status(500).json({ error: 'Failed to fetch options', message: error.message });
    }
};

