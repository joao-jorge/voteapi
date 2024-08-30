const mongoose = require('mongoose');
const Election = require('../models/electionModel')
const Candidate = require('../models/candidateModel')

const voteSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Election,
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Candidate,
    required: true
  },
  votedAt: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
