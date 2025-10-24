import * as customBuildService from './custom_build.service.js';
import { Request, Response } from 'express';
import type { CreateCustomBuildInput, UpdateCustomBuildInput } from './custom_build.service.js';

/**
 * GET /api/builds
 * Fetch all custom builds
 */
export const getCustomBuilds = async (req: Request, res: Response): Promise<void> => {
    try {
        const customBuilds = await customBuildService.findAllCustomBuilds();
        res.status(200).json(customBuilds);
    } catch (error: any) {
        console.error('Error fetching custom builds:', error);
        res.status(500).json({ error: 'Failed to fetch custom builds', message: error.message });
    }
};

/**
 * GET /api/builds/:id
 * Fetch a single custom build by ID
 */
export const getCustomBuildById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid build ID' });
            return;
        }

        const customBuild = await customBuildService.findCustomBuildById(id);
        
        if (!customBuild) {
            res.status(404).json({ error: 'Build not found' });
            return;
        }

        res.status(200).json(customBuild);
    } catch (error: any) {
        console.error('Error fetching custom build:', error);
        res.status(500).json({ error: 'Failed to fetch custom build', message: error.message });
    }
};

/**
 * POST /api/builds
 * Create a new custom build
 */
export const createCustomBuild = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            exterior_color_id,
            interior_color_id,
            body_style_id,
            wheels_id,
            performance_package_id,
            total_price
        } = req.body;

        // Basic validation
        if (
            !exterior_color_id ||
            !interior_color_id ||
            !body_style_id ||
            !wheels_id ||
            !performance_package_id ||
            total_price === undefined
        ) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Validate types
        if (
            typeof exterior_color_id !== 'number' ||
            typeof interior_color_id !== 'number' ||
            typeof body_style_id !== 'number' ||
            typeof wheels_id !== 'number' ||
            typeof performance_package_id !== 'number' ||
            typeof total_price !== 'number'
        ) {
            res.status(400).json({ error: 'Invalid field types. All IDs and price must be numbers.' });
            return;
        }

        const buildData: CreateCustomBuildInput = {
            exterior_color_id,
            interior_color_id,
            body_style_id,
            wheels_id,
            performance_package_id,
            total_price,
        };

        const customBuild = await customBuildService.createCustomBuild(buildData);
        res.status(201).json(customBuild);
    } catch (error: any) {
        console.error('Error creating custom build:', error);
        res.status(500).json({ error: 'Failed to create custom build', message: error.message });
    }
};

/**
 * PUT /api/builds/:id
 * Update an existing custom build
 */
export const updateCustomBuild = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid build ID' });
            return;
        }

        const {
            exterior_color_id,
            interior_color_id,
            body_style_id,
            wheels_id,
            performance_package_id,
            total_price
        } = req.body;

        const buildData: UpdateCustomBuildInput = {};

        // Only include fields that are provided
        if (exterior_color_id !== undefined) buildData.exterior_color_id = exterior_color_id;
        if (interior_color_id !== undefined) buildData.interior_color_id = interior_color_id;
        if (body_style_id !== undefined) buildData.body_style_id = body_style_id;
        if (wheels_id !== undefined) buildData.wheels_id = wheels_id;
        if (performance_package_id !== undefined) buildData.performance_package_id = performance_package_id;
        if (total_price !== undefined) buildData.total_price = total_price;

        const customBuild = await customBuildService.updateCustomBuild(id, buildData);
        
        if (!customBuild) {
            res.status(404).json({ error: 'Build not found or no fields to update' });
            return;
        }

        res.status(200).json(customBuild);
    } catch (error: any) {
        console.error('Error updating custom build:', error);
        res.status(500).json({ error: 'Failed to update custom build', message: error.message });
    }
};

/**
 * DELETE /api/builds/:id
 * Delete a custom build
 */
export const deleteCustomBuild = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid build ID' });
            return;
        }

        const deleted = await customBuildService.deleteCustomBuild(id);
        
        if (!deleted) {
            res.status(404).json({ error: 'Build not found' });
            return;
        }

        res.status(200).json({ message: 'Custom build deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting custom build:', error);
        res.status(500).json({ error: 'Failed to delete custom build', message: error.message });
    }
};