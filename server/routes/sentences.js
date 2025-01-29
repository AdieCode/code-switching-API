const express = require('express');
const router = express.Router();
const { data } = require('../data/data.js');
const { getRandomItem } = require('../modules/modules.js')

router.get('/get', (req, res, next) => {
    data.getSentences((err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(result); // Send the result to the client as JSON
    });

});

router.get('/random', (req, res, next) => {
    data.getRandomSentence((err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        
        res.status(200).json(result); // Send the result to the client as JSON
    });

});

router.post('/add', (req, res, next) => {
    const sentence = req.body.sentence;

    if (sentence.length > 4){
        data.addSentence(sentence, (err, result) => {
            if (err) {
                console.error('Error adding sentence to database:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(200).json({
                message: 'Sentence added!'
            }); // Send the result to the client as JSON
        });
    
    } else {
        res.status(404).send('Invalid data received.\n\n note :\n - setence length should be 5 characters or more \n - request  body should look like this { "sentence" : "Hi there." }');
    }

});

router.post('/correction', (req, res, next) => {
    const sentence = req.body.sentence;
    const sentence_id = req.body.sentence;

    if (sentence.length > 4 && sentence_id){
        data.addCorrection(req.body, (err, result) => {
            if (err) {
                console.error('Error adding envelopes to database:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(200).json(result); // Send the result to the client as JSON
        });
    
    } else {
    res.status(404).send('Invalid data received.\n\n note :\n - setence length should be 5 characters or more \n - request  body should look like this { "sentence" : "Hi there.", "sentence_id" : 4 }');
    }

});

module.exports = router;