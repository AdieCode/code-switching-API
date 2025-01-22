const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config();


app.use(cors('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Requiring routers
const sentenceRouter = require('../routes/sentences');
const voteRouter = require('../routes/vote');

// Welcome text for defualt request
app.get('/', (req, res) => {
    res.send('Welcome to the code-switching API');
});
  
// Mounting the router to a specific path
app.use('/sentences', sentenceRouter);
app.use('/vote', voteRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
