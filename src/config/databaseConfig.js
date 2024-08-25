const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' });

const DB = process.env.DB_PROD;
const uri = DB;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('Connected to DB successfully');
})