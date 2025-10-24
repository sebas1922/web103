import { Router } from 'express';
import { getCustomBuilds, getCustomBuildById, createCustomBuild, updateCustomBuild, deleteCustomBuild } from './custom_build.controller.js';

const customBuildRouter = Router();

// GET /api/builds - Get all custom builds
customBuildRouter.get('/', getCustomBuilds);

// GET /api/builds/:id - Get a single custom build by ID
customBuildRouter.get('/:id', getCustomBuildById);

// POST /api/builds - Create a new custom build
customBuildRouter.post('/', createCustomBuild);

// PUT /api/builds/:id - Update a custom build
customBuildRouter.put('/:id', updateCustomBuild);

// DELETE /api/builds/:id - Delete a custom build
customBuildRouter.delete('/:id', deleteCustomBuild);

export default customBuildRouter;