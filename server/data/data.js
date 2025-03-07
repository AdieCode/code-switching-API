const { Pool } = require('pg');

const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL;
let codeSwitcher;
console.log(`Environment: ${NODE_ENV}`);
console.log(`Database URL: ${DATABASE_URL}`);

if (NODE_ENV === "PROD") {
    codeSwitcher = new Pool({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: true, // Use true if you have a trusted certificate
        }
    });
    
} else {
    
    codeSwitcher = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'CodeSwitching',
        password: 'postgres',
        port: 5432, 
    });
}

codeSwitcher.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err));

  
// Option for retrieving data fom database
const data = {
    addSentence: function(sentence, callback) {
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

    getRandomSentence: function(callback) {
        codeSwitcher.query('SELECT sentence, id FROM sentences ORDER BY RANDOM() LIMIT 1', (err, res) => {
            if (err) {
                console.error('Error retrieving random sentence:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows[0]);
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
    },

    addVote: function(data, callback) {
        const { sentence_id, vote, selection } = data;

        let column;
        switch (selection) {
            case 1:
                column = vote === 'yes' ? 'yes_votes_1' : 'no_votes_1';
                break;
            case 2:
                column = vote === 'yes' ? 'yes_votes_2' : 'no_votes_2';
                break;
            case 3:
                column = vote === 'yes' ? 'yes_votes_3' : 'no_votes_3';
                break;
            case 4:
                column = vote === 'yes' ? 'yes_votes_4' : 'no_votes_4';
                break;
            case 5:
                column = vote === 'yes' ? 'yes_votes_5' : 'no_votes_5';
                break;
            default:
                callback(new Error('Invalid selection value'), null);
                return;
        }

        const updateQuery = `UPDATE sentences SET ${column} = ${column} + 1 WHERE id = $1`;

        codeSwitcher.query(updateQuery, [sentence_id], (err, res) => {
            if (err) {
                console.error('Error updating votes:', err);
                callback(err, null);
                return;
            }
            // Return the updated row
            callback(null, 'Vote added');
        });
    },

    addFeedback: function(data, callback) {
        const { feedback, sentence_id } = data;
        codeSwitcher.query('INSERT INTO comments (comment, sentence_id) VALUES ($1, $2)', [feedback, sentence_id], (err, res) => {
            if (err) {
                console.error('Error adding Correction:', err);
                callback(err, null);
                return;
            }
            callback(null, 'Correction added to database.'); // Return the newly added stack
        });
    },

}

// Listen for the exit event to close the connection pool when the application exits
process.on('exit', () => {
    console.log('Closing the connection pool...');
    budgetManager.end(); // Close the connection pool
  });
  
// Optionally, handle other signals that may cause your application to exit
process.on('SIGINT', () => {
console.log('Received SIGINT. Exiting...');
process.exit(0);
});

process.on('SIGTERM', () => {
console.log('Received SIGTERM. Exiting...');
process.exit(0);
});

module.exports = { data };