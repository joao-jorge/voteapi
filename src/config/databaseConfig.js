const mongoose = require('mongoose');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
require('dotenv').config({ path: '.env' });

const URI = process.env.LOCAL_URI || config.ONLINE_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('Connected to DB successfully');
});