const codeSwitcherDB = require('./pool.js');

const updateData = {
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

        codeSwitcherDB.query(updateQuery, [sentence_id], (err, res) => {
            if (err) {
                console.error('Error updating votes:', err);
                callback(err, null);
                return;
            }
            // Return the updated row
            callback(null, 'Vote added');
        });
    },
    addCorretedEngVote: function(data, callback) {
        const { corrected_sentence_id, vote } = data;
        let column;
        if (vote === 'yes') {
            column = 'yes_votes';
        }
        else if (vote === 'no') {
            column = 'no_votes';
        } else {
            callback(new Error('Invalid vote value'), null);
            return;
        }

        const updateQuery = `UPDATE corrected_sentences_english SET ${column} = ${column} + 1  WHERE id = $1`;

        codeSwitcherDB.query(updateQuery, [corrected_sentence_id], (err, res) => {
            if (err) {
                console.error('Error updating votes:', err);
                callback(err, null);
                return;
            }
            // Return the updated row
            callback(null, 'Vote added');
        });
    },
    addCorretedAfrVote: function(data, callback) {
        const { corrected_sentence_id, vote } = data;
        let column;
        if (vote === 'yes') {
            column = 'yes_votes';
        }
        else if (vote === 'no') {
            column = 'no_votes';
        } else {
            callback(new Error('Invalid vote value'), null);
            return;
        }

        const updateQuery = `UPDATE corrected_sentences_afrikaans SET ${column} = ${column} + 1 WHERE id = $1`;

        codeSwitcherDB.query(updateQuery, [corrected_sentence_id], (err, res) => {
            if (err) {
                console.error('Error updating votes:', err);
                callback(err, null);
                return;
            }
            // Return the updated row
            callback(null, 'Vote added');
        });
    },

}

module.exports = { updateData };