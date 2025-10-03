import { config } from './environment.js';
import { Client } from 'pg';

export function PgClient(): Client {
    const sslConfig = (config.database.ssl || '');
    
    return new Client({
        host: config.database.host || 'localhost',
        port: config.database.port || 5432,
        database: config.database.name || 'listicle_db',
        user: config.database.user || 'postgres',
        password: config.database.password || 'password',
        ssl: sslConfig
    });
}