const { Pool } = require('pg');
// const DATABASE_URL = process.env.DATABASE_URL;

// Connection pool configuration when online server deployed
// const codeSwitcher = new Pool({
//     connectionString: DATABASE_URL,
// });

const codeSwitcher = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CodeSwitching',
    password: 'postgres',
    port: 5432, 
});
  
// Option for retrieving data fom database
const data = {
    getSentences: function(callback) {
        codeSwitcher.query('SELECT * FROM sentences', (err, res) => {
            if (err) {
                console.error('Error getting sentences:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    }
}

module.exports = { data };