import postgres from 'postgres'
import dotenv from 'dotenv'
import path from 'path'

const __dirname = import.meta.dirname;

dotenv.config({ path: path.join(__dirname, '../.env') })

const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString)

export default sql
