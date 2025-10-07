import { Client } from 'pg';
import { AppConfig } from './env';

const client = new Client({
    user: AppConfig.POSTGRES_USER,
    password: AppConfig.POSTGRES_PASSWORD,
    host: AppConfig.POSTGRES_HOST,
    database: AppConfig.POSTGRES_DB,
});

export default client;