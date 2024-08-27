const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' });

const URI = process.env.LOCAL_URI || "mongodb+srv://joao:nuno12@mongoclusterlearn.z3vxm.mongodb.net/voteapi_db?retryWrites=true&w=majority&appName=mongoclusterlearn";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('Connected to DB successfully');
})