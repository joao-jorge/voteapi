const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const Router = express.Router();
require('dotenv').config({ path: '../.env' });

// Database connection
const dbconnection = require('../src/config/databaseConfig'); 

// Access environment variables
const DBURL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes 
const userRoutes = require('./api/routes/User')
app.use('/', userRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

