const Vote = require('../models/voteModel')
const Candidate = require('../models/candidateModel')
const Election = require('../models/electionModel')
const User = require('../models/userModel')

const castVote = async (req, res) => {
    try{
        const { idElection, idUser, idCandidate } = req.params

        // Input validation
        if (!idElection || !idUser || !idCandidate) {
          return res.status(400).json({ message: 'Invalid input parameters.' });
        }
                const foundElection= await Election.findById(idElection);
        if (!foundElection) {
          return res.status(404).json({ message: 'Could not vote! Election not found.' });
        }

        // Verify if the election is ongoing
        const dateNow = new Date()
        if(dateNow < foundElection.startDate || dateNow > foundElection.endDate){
          return res.status(400).json({message: "The election is not available in this date"})
        }

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
        if(foundUser.election.includes(idElection)){
            return res.status(400).json({message: "Could not vote! User has already voted."})
        }
        
        const vote = new Vote({
            election: idElection,
            candidate: idCandidate
        });
        const savedVote = await vote.save();

        //Add the idElection to the user who has voted 
        foundUser.election.push(idElection)
        await foundUser.save()
        res.status(200).json({message: "Uer has successfully voted!"});

    }catch(error){res.status(500).json({ message: error.message })}
}

module.exports = {
    castVote
};