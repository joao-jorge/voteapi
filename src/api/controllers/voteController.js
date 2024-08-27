const Vote = require('../models/voteModel')
const Candidate = require('../models/candidateModel')
const Election = require('../models/electionModel')


const castVote = async (req, res) => {
    try{

    }catch(error){res.status(500).json({ message: error.message })}
}