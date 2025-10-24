import pg from 'pg'
import './dotenv.js'

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'NOT SET ✗')
console.log('DATABASE_URL value:', process.env.DATABASE_URL)

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error connecting to the database:', err.message)
        console.error('Full error:', err)
    } else {
        console.log('✅ Database connected successfully!')
        release()
    }
})