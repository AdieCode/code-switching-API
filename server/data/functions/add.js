const codeSwitcherDB = require('./pool.js');

const addData = {
    addSentence: function(sentence, callback) {
        codeSwitcherDB.query('INSERT INTO sentences (sentence) VALUES ($1)', [sentence], (err, res) => {
            if (err) {
                console.error('Error adding sentence:', err);
                callback(err, null);
                return;
            }
            callback(null, 'Sentence added to database.'); // Return the newly added stack
        });
    },

    addFeedback: function(data, callback) {
        const { feedback, sentence_id } = data;
        codeSwitcherDB.query('INSERT INTO comments (comment, sentence_id) VALUES ($1, $2)', [feedback, sentence_id], (err, res) => {
            if (err) {
                console.error('Error adding Correction:', err);
                callback(err, null);
                return;
            }
            callback(null, 'Correction added to database.'); // Return the newly added stack
        });
    },

}

module.exports = { addData };