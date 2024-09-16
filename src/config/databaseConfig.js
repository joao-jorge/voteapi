const mongoose = require('mongoose');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
require('dotenv').config({ path: '.env' });

const URI = config.ONLINE_URL || config.LOCAL_URI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log("VOLUMEE: " +URI)
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('Connected to DB successfully');
});