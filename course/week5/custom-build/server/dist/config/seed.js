import pool from './db.js'; // Note the .js extension
const createCustomBuildsTableScript = `
    DROP TABLE IF EXISTS custom_builds;

    CREATE TABLE custom_builds (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        exterior_color VARCHAR(50) NOT NULL,
        interior_color VARCHAR(50) NOT NULL,
        body_style VARCHAR(50) NOT NULL,
        wheels VARCHAR(50) NOT NULL,
        performance_package VARCHAR(50) NOT NULL,
        total_price INTEGER NOT NULL
    );
`;
const setupDatabase = async () => {
    console.log("Attempting to connect to database...");
    try {
        await pool.query('SELECT NOW()'); // Test connection
        console.log("Connection successful. Creating table...");
        await pool.query(createCustomBuildsTableScript);
        console.log('✅ custom_builds table created successfully');
    }
    catch (err) {
        console.error('❌ Error during database setup:', err.message);
    }
    finally {
        await pool.end();
        console.log('Database setup script finished. Pool closed.');
    }
};
setupDatabase();
