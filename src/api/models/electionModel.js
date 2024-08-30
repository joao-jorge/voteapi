const mongoose = require('mongoose');
const candidate = require('../models/candidateModel')

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: candidate // Reference to the User model
    }], 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
