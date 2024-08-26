const express = require('express')
const app = express();
require('dotenv').config({ path: '../.env' });

// Database connection
const dbconnection = require('../src/config/databaseConfig'); 

// Access environment variables
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes 
const userRoutes = require('./api/routes/user')
app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

