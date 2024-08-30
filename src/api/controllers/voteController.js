const Vote = require('../models/voteModel')
const Candidate = require('../models/candidateModel')
const Election = require('../models/electionModel')
const User = require('../models/userModel')


const castVote = async (req, res) => {
    try{
        const { idElection, idUser, idCandidate } = req.params

        const foundElection= await Election.findById(idElection);
        if (!foundElection) {
          return res.status(404).json({ message: 'Could not vote! Election not found.' });
        }

        // Verify if the election is ongoing
        //if(){

        //}

        // Verify if the candidate exists
        const foundCandidate = await Candidate.findById(idCandidate);
        if (!foundCandidate) {
          return res.status(404).json({ message: 'Could not vote! Candidate does not exists.' });
        }

        // Verify if the user exists
        const foundUser = await User.findById(idUser);
        if (!foundUser) {
          return res.status(404).json({ message: 'Could not vote! User does not exists.' });
        }

        // Verify if the user has already voted
        if(foundUser.election.includes(idUser)){
            return res.status(400).json({message: "Could not vote! User has already voted."})
        }
        
        const vote = new Vote({
            idElection,
            idCandidate
        });

        const savedVote = await vote.save();
        res.status(200).json({message: "Uer has successfully voted!", vote: savedVote});

    }catch(error){res.status(500).json({ message: error.message })}
}

module.exports = [
    castVote
]