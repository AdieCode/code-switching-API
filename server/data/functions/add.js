const codeSwitcherDB = require('./pool.js');

const addData = {
    addSentence: function(sentence, topic, callback) {
        codeSwitcherDB.query('INSERT INTO sentences (sentence, topic) VALUES ($1, $2)', [sentence, topic], (err, res) => {
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

    addCorrectedSentenceAfr: function(data, callback) {
        const { sentence, corrected_sentence_id } = data;
        codeSwitcherDB.query('INSERT INTO adjusted_corrected_sentences_afrikaans (text, corrected_sentences_id) VALUES ($1, $2)', [sentence, corrected_sentence_id], (err, res) => {
            if (err) {
                console.error('Error adding Correction:', err);
                callback(err, null);
                return;
            }
            callback(null, 'Correction added to database.'); // Return the newly added stack
        });
    },

    addCorrectedSentenceEng: function(data, callback) {
        const { sentence, corrected_sentence_id } = data;
        codeSwitcherDB.query('INSERT INTO adjusted_corrected_sentences_english (text, corrected_sentences_id) VALUES ($1, $2)', [sentence, corrected_sentence_id], (err, res) => {
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