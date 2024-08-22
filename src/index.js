require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Access environment variables
const DBURL = process.env.DATABASE_URL;
const port = process.env.PORT || 2000;

const app = express();
app.use(bodyParser.json());



console.log("porta: ", port)
console.log("porta: ", process.env.DATABASE_URL)
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
