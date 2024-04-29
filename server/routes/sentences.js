const express = require('express')
const router = express.Router();
const { data } = require('../data/data.js')

router.get('/', (req, res, next) => {
    data.getSentences((err, result) => {
        if (err) {
            console.error('Error getting envelopes:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          console.log(result)
          res.status(200).json(result); // Send the result to the client as JSON
    })

});

module.exports = router;