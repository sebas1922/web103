import { config } from './environment.js';
import { Client } from 'pg';
import { carsData } from '../data/cars.js';

function getPgClient(): Client {
    const sslConfig = (config.database.ssl || '');
    console.log(config.database);

    return new Client({
        host: config.database.host || 'localhost',
        port: config.database.port || 5432,
        database: config.database.name || 'listicle_db',
        user: config.database.user || 'postgres',
        password: config.database.password || 'password',
        ssl: sslConfig
    });
}

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    description TEXT,
    image_url TEXT,
    engine TEXT,
    horsepower INTEGER,
    top_speed INTEGER,
    drivetrain TEXT,
    price INTEGER,
    fun_fact TEXT
  );
`;

const upsertSQL = `
  INSERT INTO cars (
    id, make, model, year, description, image_url, engine, horsepower, top_speed, drivetrain, price, fun_fact
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
  )
  ON CONFLICT (id) DO UPDATE SET
    make = EXCLUDED.make,
    model = EXCLUDED.model,
    year = EXCLUDED.year,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    engine = EXCLUDED.engine,
    horsepower = EXCLUDED.horsepower,
    top_speed = EXCLUDED.top_speed,
    drivetrain = EXCLUDED.drivetrain,
    price = EXCLUDED.price,
    fun_fact = EXCLUDED.fun_fact;
`;

async function run(): Promise<void> {
    const client = getPgClient();
    try {
        await client.connect();
        await client.query(createTableSQL);

        for (const car of carsData) {
            const values = [
                car.id,
                car.make,
                car.model,
                car.year,
                car.description ?? null,
                // map camelCase fields to snake_case columns
                car.imageURL ?? null,
                car.engine ?? null,
                car.horsepower ?? null,
                car.topSpeed ?? null,
                car.drivetrain ?? null,
                car.price ?? null,
                car.funFact ?? null
            ];
            await client.query(upsertSQL, values);
        }

        console.log(`Seeded ${carsData.length} cars.`);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exitCode = 1;
    } finally {
        await client.end();
    }
}

run();


