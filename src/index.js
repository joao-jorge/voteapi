const express = require('express')
const Router = express.Router()
require('dotenv').config({ path: '../.env' });
const dbconnection = require('../src/config/databaseConfig'); 
const bodyParser = require('body-parser');

// Access environment variables
const DBURL = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  res.send('Hello, Nuno')
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
