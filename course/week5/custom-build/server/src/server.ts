import express from 'express';
import cors from 'cors';
import customBuildRouter from './api/custom_build/custom_build.route.js';
import optionsRouter from './api/options/options.route.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your client's port
app.use(express.json()); // Enable parsing JSON request bodies

// --- API Routes ---
app.use('/api/builds', customBuildRouter); // Custom builds CRUD
app.use('/api/options', optionsRouter); // Options (read-only)

// --- Basic Root Route ---
app.get('/api', (req, res) => {
    res.send('CUSTOM BUILD API is running!');
});

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});