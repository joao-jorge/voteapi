const mongoose = require('mongoose');

// Define the schema for a User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model from the schema
const User = mongoose.model('user', userSchema);

module.exports = User;
