// server/src/config/environment.ts
import 'dotenv/config';
export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'listicle_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        url: process.env.DB_URL || 'postgres://postgres:password@localhost:5432/listicle_db',
        ssl: { rejectUnauthorized: false }
    }
};
