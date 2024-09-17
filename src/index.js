const express = require('express');
const cors = require('cors')
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
require('dotenv').config({ path: '../.env' });
const app = express();

// Database connection
const dbconnection = require('../src/config/databaseConfig'); 

//const port = config.ONLINE_PORT
const port = config.LOCAL_PORT;
// Middlewares
app.use(express.json());
app.use(cors())

// User Routes
const UserRoutes = require('./api/routes/userRoute')
app.use('/api/user', UserRoutes)

// Election Routes
const ElectionsRoutes = require('./api/routes/electionRoute')
app.use('/api/election', ElectionsRoutes)

// Candidate Routes
const CandidateRoutes = require('./api/routes/candidateRoute')
app.use('/api/candidate', CandidateRoutes)

// Vote Routes
const VoteRoutes = require('./api/routes/voteRoute')
app.use('/api/vote', VoteRoutes)
       


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

