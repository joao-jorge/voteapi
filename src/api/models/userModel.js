const mongoose = require('mongoose');
const electionModel = require('../models/electionModel')

// Define the Election reference and hasVoted field schema
const electionSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: electionModel // Ensure 'Election' is the correct model name
  },
  hasVoted: {
    type: String,
    enum: ["yes"],
    default: "no" // Assuming you want a default value when the user hasn't voted
  }
});

// Define the schema for a User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  elections: [electionSchema],
},{ timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
