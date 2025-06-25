const express = require('express');
const router = express.Router();
const data = require('../data/index.js');

router.get('/get', (req, res, next) => {
    data.getData.getSentences((err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(result); // Send the result to the client as JSON
    });

});

router.post('/random', (req, res, next) => {
    excludeIds = req.body?.excludeIds;
    data.getData.getRandomSentence(excludeIds, (err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (result) {
            res.status(200).json(result); // Send the result to the client as JSON
        } else {
            res.status(404).send({sentence: 'No sentence found.'});
        }
    });

});

router.post('/add', (req, res, next) => {
    const sentence = req.body.sentence;
    const topic = req.body.topic;
    const incorrectSentence = req.body.incorrectSentence;
    const afrTranslation = req.body.afrTranslation;
    const engTranslation = req.body.engTranslation;

    if (sentence.length > 4 && topic && incorrectSentence && afrTranslation && engTranslation){
        data.addData.addSentence(sentence, incorrectSentence, afrTranslation, engTranslation, topic, (err, result) => {
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
        res.status(404).send('Invalid data received.\n\n note :\n - setence length should be 5 characters or more');
    }

});

router.get('/get/correction/afr', (req, res, next) => {
    data.getData.getCorrectionAfr(req.query, (err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(result); // Send the result to the client as JSON
    });
});

router.get('/get/correction/eng', (req, res, next) => {
    data.getData.getCorrectionEng(req.query, (err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(result); // Send the result to the client as JSON
    });

});


router.post('/correction/afr', (req, res, next) => {
    const sentence = req.body.sentence;
    const corrected_sentence_id = req.body.corrected_sentence_id;

    if (sentence.length > 4 && corrected_sentence_id){
        data.addData.addCorrectedSentenceAfr(req.body, (err, result) => {
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

router.post('/correction/eng', (req, res, next) => {
    const sentence = req.body.sentence;
    const corrected_sentence_id = req.body.corrected_sentence_id;

    if (sentence.length > 4 && corrected_sentence_id){
        data.addData.addCorrectedSentenceEng(req.body, (err, result) => {
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

router.post('/feedback', (req, res, next) => {
    const feedback = req.body.feedback;
    const sentence_id = req.body.sentence_id;

    if (feedback.length > 4 && sentence_id){
        data.addData.addFeedback(req.body, (err, result) => {
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