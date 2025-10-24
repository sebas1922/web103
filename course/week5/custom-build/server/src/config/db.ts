import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { Pool } = pg;

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_DATABASE,
};

// --- Create and Export Pool ---
// Create the pool instance directly. It manages connections internally.
const pool = new Pool(config);

// Optional: Add an event listener for errors on idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

console.log('Database pool configured.'); // Log configuration success

export default pool;