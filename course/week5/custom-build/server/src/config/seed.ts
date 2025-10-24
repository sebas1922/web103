import pool from './db.js'; // Ensure correct path to db config
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Point to root .env

// --- Table Creation SQL ---
const createSchemaScript = `
    DROP TABLE IF EXISTS custom_builds CASCADE;
    DROP TABLE IF EXISTS exterior_colors CASCADE;
    DROP TABLE IF EXISTS interior_colors CASCADE;
    DROP TABLE IF EXISTS body_styles CASCADE;
    DROP TABLE IF EXISTS wheels CASCADE;
    DROP TABLE IF EXISTS performance_packages CASCADE;

    CREATE TABLE exterior_colors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        price_modifier INTEGER NOT NULL DEFAULT 0,
        image_url TEXT
    );

    CREATE TABLE interior_colors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        price_modifier INTEGER NOT NULL DEFAULT 0,
        image_url TEXT
    );

    CREATE TABLE body_styles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        price_modifier INTEGER NOT NULL DEFAULT 0,
        image_url TEXT
    );

    CREATE TABLE wheels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        price_modifier INTEGER NOT NULL DEFAULT 0,
        image_url TEXT
    );

    CREATE TABLE performance_packages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        price_modifier INTEGER NOT NULL DEFAULT 0,
        description TEXT
    );

    CREATE TABLE custom_builds (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        exterior_color_id INTEGER REFERENCES exterior_colors(id),
        interior_color_id INTEGER REFERENCES interior_colors(id),
        body_style_id INTEGER REFERENCES body_styles(id),
        wheels_id INTEGER REFERENCES wheels(id),
        performance_package_id INTEGER REFERENCES performance_packages(id),
        total_price INTEGER NOT NULL
    );
`;

// --- Seed Data ---
const seedOptions = async (client: any) => {
    console.log("Seeding options...");
    try {
        // Exterior Colors
        await client.query(`
            INSERT INTO exterior_colors (name, price_modifier, image_url) VALUES
            ('Glacier White', 0, '/images/swatch_white.png'),
            ('Midnight Black', 0, '/images/swatch_black.png'),
            ('Velocity Red', 500, '/images/swatch_red.png'),
            ('Quantum Blue', 500, '/images/swatch_blue.png');
        `);
        // Interior Colors
        await client.query(`
            INSERT INTO interior_colors (name, price_modifier, image_url) VALUES
            ('Ebony Cloth', 0, '/images/swatch_int_black.png'),
            ('Ash Leatherette', 800, '/images/swatch_int_ash.png'),
            ('Crimson Red Leather', 1200, '/images/swatch_int_red.png');
        `);
        // Body Styles
         await client.query(`
            INSERT INTO body_styles (name, price_modifier, image_url) VALUES
            ('Sedan', 0, '/images/body_sedan.png'),
            ('Coupe', 1000, '/images/body_coupe.png'),
            ('SUV', 2500, '/images/body_suv.png');
        `);
        // Wheels
        await client.query(`
            INSERT INTO wheels (name, price_modifier, image_url) VALUES
            ('18" Standard Alloy', 0, '/images/wheel_standard.png'),
            ('19" Sport Machined', 1500, '/images/wheel_sport.png'),
            ('20" Performance Black', 2500, '/images/wheel_performance.png');
        `);
        // Performance Packages
        await client.query(`
            INSERT INTO performance_packages (name, price_modifier, description) VALUES
            ('Base', 0, 'Standard engine and suspension setup.'),
            ('Sport', 3000, 'Upgraded engine tuning, sport suspension, larger brakes.'),
            ('Luxury', 4000, 'Premium interior features, adaptive suspension, advanced tech.');
        `);
        console.log('🌱 Options seeded successfully');
    } catch (err: any) {
        console.error('❌ Error seeding options:', err.message);
        throw err; // Re-throw error to stop the process if seeding fails
    }
};

const seedBuilds = async (client: any) => {
    console.log("Seeding example builds...");
    // Note: These IDs assume the order of inserts in seedOptions
    const builds = [
        // Red Coupe, Black Interior, Sport Wheels, Sport Package
        { ext_color_id: 3, int_color_id: 1, body_id: 2, wheels_id: 2, pkg_id: 2, price: 30000 + 500 + 0 + 1000 + 1500 + 3000 },
        // Blue Sedan, Ash Interior, Standard Wheels, Base Package
        { ext_color_id: 4, int_color_id: 2, body_id: 1, wheels_id: 1, pkg_id: 1, price: 30000 + 500 + 800 + 0 + 0 + 0 },
        // Black SUV, Red Interior, Performance Wheels, Luxury Package
        { ext_color_id: 2, int_color_id: 3, body_id: 3, wheels_id: 3, pkg_id: 3, price: 30000 + 0 + 1200 + 2500 + 2500 + 4000 }
    ];
    const query = `
        INSERT INTO custom_builds (exterior_color_id, interior_color_id, body_style_id, wheels_id, performance_package_id, total_price)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;
    try {
        await Promise.all(builds.map(b =>
            client.query(query, [b.ext_color_id, b.int_color_id, b.body_id, b.wheels_id, b.pkg_id, b.price])
        ));
        console.log('🌱 Example builds seeded successfully');
    } catch (err: any) {
        console.error('❌ Error seeding builds:', err.message);
        throw err;
    }
}

// --- Main Setup Function ---
const setupDatabase = async () => {
    console.log("Attempting database setup...");
    let client;
    try {
        client = await pool.connect(); // Test connection explicitly
        console.log("Connection successful!");

        console.log("Creating tables...");
        await client.query(createSchemaScript);
        console.log('✅ All tables created successfully');

        // Seed options first
        await seedOptions(client);

        // Then seed example builds
        await seedBuilds(client);

    } catch (err: any) {
        console.error('❌ Error during database setup:', err.stack); // Log full stack trace
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
            console.log("Client released.");
        }
        await pool.end(); // Close all connections in the pool
        console.log('Database setup script finished. Pool closed.');
    }
};

setupDatabase();