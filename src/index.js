const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config({ path: '../.env' });

// Database connection
const dbconnection = require('../src/config/databaseConfig'); 

// Access environment variables
const port = process.env.PORT || 4000;

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

