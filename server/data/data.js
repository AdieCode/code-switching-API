const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;

// Connection pool configuration
const budgetManager = new Pool({
    connectionString: DATABASE_URL,
});

//Example
const data = {
    addStack: function(newData, callback) {
        const { title } = newData;
        budgetManager.query('INSERT INTO stacks (title, total_budget) VALUES ($1, $2) RETURNING *', [title, 0], (err, res) => {
            if (err) {
                console.error('Error adding stack:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows[0]); // Return the newly added stack
        });
    }
}

module.exports = { data };