const express = require('express')
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../.env' });

// Database connection
const dbconnection = require('../src/config/databaseConfig'); 

// Access environment variables
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Routes 
const userRoutes = require('./api/routes/user')
app.use('/', userRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

