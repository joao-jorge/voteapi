const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let votes = {
    'Option A': 0,
    'Option B': 0,
    'Option C': 0
};

// Endpoint to get voting options
app.get('/options', (req, res) => {
    res.json(Object.keys(votes));
});

// Endpoint to submit a vote
app.post('/vote', (req, res) => {
    const { option } = req.body;
    if (votes.hasOwnProperty(option)) {
        votes[option]++;
        res.json({ message: 'Vote counted' });
    } else {
        res.status(400).json({ message: 'Invalid option' });
    }
});

// Endpoint to get results
app.get('/results', (req, res) => {
    res.json(votes);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
