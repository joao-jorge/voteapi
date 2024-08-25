const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' });

const uri = process.env.DB_PROD;
//mongodb+srv://joao:nuno12@mongoclusterlearn.z3vxm.mongodb.net/?retryWrites=true&w=majority&appName=mongoclusterlearn

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('Connected to DB successfully');
})