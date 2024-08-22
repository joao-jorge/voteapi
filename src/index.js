require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');

// Access environment variables
const DBURL = process.env.DATABASE_URL;
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
