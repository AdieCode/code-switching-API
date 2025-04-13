const express = require('express')
const router = express.Router();
const data = require('../data/index.js')

router.post('/', (req, res, next) => {
    // const sentence_id = req.body.sentence_id;
    const vote = req.body.vote;

    if ( (vote === 'yes') || (vote === 'no') ){
        data.updateData.addVote(req.body, (err, result) => {
            if (err) {
                console.error('Error adding vote to database:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(200).json(result); // Send the result to the client as JSON
        });
    
    } else {
    res.status(404).send('Invalid data received.\n\n note :\n - setence_id might be wrong \n - vote must be either "yes" or "no" \n - request  body should look like this { "sentence_id" : 1, "vote" : "yes" }');
    }
});

module.exports = router;