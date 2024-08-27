const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    party: {type: String, required: true, unique: true}
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;