import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from the project root (onthefly folder)
dotenv.config({ path: join(__dirname, '../../.env') })

console.log('.env file loaded from:', join(__dirname, '../../.env'))