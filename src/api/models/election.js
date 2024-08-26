const mongoose = require('mongoose');
const candidateSchema = require('./user');

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    candidates: [candidateSchema], 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
