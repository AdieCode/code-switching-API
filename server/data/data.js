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
    addSentence: function(data, callback) {
        const { sentence } = data;
        codeSwitcher.query('INSERT INTO sentences (sentence) VALUES ($1)', [sentence], (err, res) => {
            if (err) {
                console.error('Error adding sentence:', err);
                callback(err, null);
                return;
            }
            callback(null, 'Sentence added to database.'); // Return the newly added stack
        });
    },

    getSentences: function(callback) {
        codeSwitcher.query('SELECT * FROM sentences', (err, res) => {
            if (err) {
                console.error('Error getting sentences:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    },

    addCorrection: function(data, callback) {
        const { sentence, sentence_id } = data;
        codeSwitcher.query('INSERT INTO corrections (sentence, sentence_id) VALUES ($1, $2)', [sentence, sentence_id], (err, res) => {
            if (err) {
                console.error('Error adding Correction:', err);
                callback(err, null);
                return;
            }
            callback(null, 'Correction added to database.'); // Return the newly added stack
        });
    },

    getCorrections: function(data, callback) {
        const { sentence_id } = data;
        codeSwitcher.query('SELECT * FROM corrections WHERE $1', [sentence_id], (err, res) => {
            if (err) {
                console.error('Error getting corrections:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    },

    getAllCorrections: function(callback) {
        codeSwitcher.query('SELECT * FROM corrections', (err, res) => {
            if (err) {
                console.error('Error getting corrections:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    }

}

module.exports = { data };