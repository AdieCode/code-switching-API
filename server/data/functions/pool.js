const { Pool } = require('pg');

const NODE_ENV = process.env.NODE_ENV;
console.log(`Environment: ${NODE_ENV}`);

const DATABASE_URL = process.env.DATABASE_URL;
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

let codeSwitcherDB;

//================================
// setup for DB connection
//================================
try {
    if (NODE_ENV === "PROD") {
        codeSwitcherDB = new Pool({
            connectionString: DATABASE_URL,
            ssl: {
                rejectUnauthorized: true,
            }
        });
    } else {
        codeSwitcherDB = new Pool({
            user: DB_USER,
            host: DB_HOST,
            database: DB_NAME,
            password: DB_PASSWORD,
            port: DB_PORT, 
        });
    }
    codeSwitcherDB.connect()
        .then(() => console.log('Connected to the database'))
        .catch((err) => console.error('Database connection error:', err));


} catch (error) {
    console.error('Database connection error:', error);
}

module.exports = codeSwitcherDB;