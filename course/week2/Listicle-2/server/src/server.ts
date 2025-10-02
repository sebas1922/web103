// src/server.ts

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import carRoutes from './api/cars/cars.route.js';
import { config } from './config/environment.js';
// --- Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Express App Setup ---
const app = express();
const PORT = config.port;

// --- 1. Middleware ---
// Serve static files from the 'client' folder first
app.use(express.static(path.join(__dirname, '..', '..', 'client')));

// --- 2. Page-Serving Routes ---
// These routes serve your HTML shells.

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'pages', 'index.html'));
});

// Route for the detail page. This is the one that needs to be correct.
app.get('/cars/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'pages', 'detail.html'));
});

// --- 3. API Routes ---
// All requests to /api will be handled by your API router
app.use('/api/cars', carRoutes);

// --- 4. 404 Catch-All ---
// This MUST be the last route. It catches any request that wasn't handled above.
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', '..', 'client', 'pages', '404.html'));
});

// --- 5. Server Startup ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🏎️`);
});