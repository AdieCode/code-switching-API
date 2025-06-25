const codeSwitcherDB = require('./pool.js');

const addData = {
    // addSentence: function(sentence, afrTranslation, engTranslation, topic, callback) {
    //     codeSwitcherDB.query('INSERT INTO sentences (sentence, topic) VALUES ($1, $2) RETURNING *', [sentence, topic], (err, res) => {
    //         if (err) {
    //             console.error('Error adding sentence:', err);
    //             callback(err, null);
    //             return;
    //         }
    //         const { id } = res.rows[0];
    //         callback(null, 'Sentence added to database.'); // Return the newly added stack
    //     });
    // },

    addSentence: function(sentence, incorrectSentence, afrTranslation, engTranslation, topic, callback) {
        codeSwitcherDB.query(
            'INSERT INTO sentences (sentence, topic) VALUES ($1, $2) RETURNING *',
            [sentence, topic],
            (err, res) => {
                if (err) {
                    console.error('Error adding sentence:', err);
                    callback(err, null);
                    return;
                }

                const { id } = res.rows[0];

                // Insert into incorrect_sentences
                codeSwitcherDB.query(
                    'INSERT INTO incorrect_sentences (text, sentence_id) VALUES ($1, $2)',
                    [incorrectSentence, id],
                    (err0) => {
                        if (err0) {
                            console.error('Error adding incorrect sentence:', err0);
                            callback(err0, null);
                            return;
                        }

                        // Insert into corrected_sentences_afrikaans
                        codeSwitcherDB.query(
                            'INSERT INTO corrected_sentences_afrikaans (text, sentence_id) VALUES ($1, $2)',
                            [afrTranslation, id],
                            (err1) => {
                                if (err1) {
                                    console.error('Error adding Afrikaans translation:', err1);
                                    callback(err1, null);
                                    return;
                                }

                                // Insert into corrected_sentences_english
                                codeSwitcherDB.query(
                                    'INSERT INTO corrected_sentences_english (text, sentence_id) VALUES ($1, $2)',
                                    [engTranslation, id],
                                    (err2) => {
                                        if (err2) {
                                            console.error('Error adding English translation:', err2);
                                            callback(err2, null);
                                            return;
                                        }

                                        callback(null, res.rows[0]); // Return the full inserted sentence row
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
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