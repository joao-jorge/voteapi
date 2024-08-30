const mongoose = require('mongoose');
const election = require('../models/electionModel')

// Define the schema for a User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  election: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: election // Reference to election model
  }]
},{ timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
