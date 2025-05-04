const codeSwitcherDB = require('./pool.js');

const getData = {
    getSentences: function(callback) {
        codeSwitcherDB.query('SELECT * FROM sentences', (err, res) => {
            if (err) {
                console.error('Error getting sentences:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    },

    getRandomSentence: function (excludeIds, callback) {
        let query;
        let params = excludeIds;
    
        if (excludeIds?.length === 0 || !excludeIds) {
            query = `
                SELECT sentence, id 
                FROM sentences 
                ORDER BY RANDOM() 
                LIMIT 1
            `;
            params = [];
        } else {
            const placeholders = excludeIds.map((_, index) => `$${index + 1}`).join(', ');
            query = `
                SELECT sentence, id 
                FROM sentences 
                WHERE id NOT IN (${placeholders}) 
                ORDER BY RANDOM() 
                LIMIT 1
            `;
        }
    
        codeSwitcherDB.query(query, params, (err, res) => {
            if (err) {
                console.error('Error retrieving random sentence with excludeIds:', excludeIds, err);
                callback(err, null);
                return;
            }
            callback(null, res.rows[0]);
        });
    },    

    getCorrectionAfr: function(data, callback) {
        const { sentence_id } = data;
        codeSwitcherDB.query('SELECT * FROM corrected_sentences_afrikaans WHERE sentence_id = $1', [sentence_id], (err, res) => {
            if (err) {
                console.error('Error getting corrections:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    },

    getCorrectionEng: function(data, callback) {
        const { sentence_id } = data;
        codeSwitcherDB.query('SELECT * FROM corrected_sentences_english WHERE sentence_id = $1', [sentence_id], (err, res) => {
            if (err) {
                console.error('Error getting corrections:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    },

    getAllCorrections: function(callback) {
        codeSwitcherDB.query('SELECT * FROM corrections', (err, res) => {
            if (err) {
                console.error('Error getting corrections:', err);
                callback(err, null);
                return;
            }
            callback(null, res.rows); // Return the newly added stack
        });
    },

}

module.exports = { getData };