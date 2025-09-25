import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import carRoutes from './api/cars/cars.route';
// Since we're using ES modules, we need to get the directory name differently
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = parseInt(process.env.PORT || '3000');
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));
// Use the car routes for any requests to /api/cars
app.use('/api/cars', carRoutes);
// A simple catch-all for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🏎️`);
});
