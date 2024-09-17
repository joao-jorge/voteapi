const mongoose = require('mongoose');
const Election = require('../models/electionModel');
const Vote = require('../models/voteModel')
const Candidate = require('../models/candidateModel')
const { format } = require('date-fns');

const createElection = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    if(!title || !description || !startDate || !endDate){
      return res.status(400).json({message: "Fill all the necessary fields!"})
    }

    // Get the current date and format it
    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

    // Create a new Election instance
    const election = new Election({
      title,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    });

    // Save the Election to the database
    const savedElection = await election.save();

    // Return the created Election
    res.status(201).json(savedElection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getElection = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }
    const election = await Election.findById(id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json(election);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listAll = async (req, res) => {
  try {
    const foundElections = await Election.find().populate('candidates.name');

    if(!foundElections){
      return res.status(404).json({ message: "There's no election!" });
    }
    res.status(200).json(foundElections);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteElection = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }

    const result = await Election.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Election not found' });
    }
    res.status(200).json({ message: 'Election deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// criar funcao para adicionar um candidato em uma eleicao
const addCandidateToElection = async (req, res) => {
  try {
    // Validate if the id is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.electionId) || !mongoose.isValidObjectId(req.params.candidateId)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }
    const election = await Election.findById(req.params.electionId)
    if(!election)
      return res.status(400).json({message: "Election not found!"});

    if(election.candidates.includes(req.params.candidateId))
      return res.status(400).json({message: "Candidate is already in the election" })
    
    // Add candidate to the election
    election.candidates.push(req.params.candidateId)
    await election.save()
    res.status(200).json({message: "Candidate added successfuly in the election"});
  } catch (error) {
    res.status(200).json({message: error.message})
  }
}

const removeCandidateFromElection = async (req, res) =>{
  try {
    // Validate if the id is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.electionId) || !mongoose.isValidObjectId(req.params.candidateId)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }

    const election = await Election.findById(req.params.electionId)
    if(!election)
      return res.status(400).json({message: "Election not found!"});

    if(!election.candidates.includes(req.params.candidateId))
      return res.status(400).json({message: "Candidate is not in the election" })
    
    // Remove the candidate from the election
    await Election.updateOne(
      { _id: election },
      { $pull: { candidates: candidateId } }
    );

    res.status(200).json({message: "Candidate removed from election successfuly", candidateId})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// criar uma funcao para modificar os dados de uma eleicao
const updateElection = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body

    if(!title || !description || !startDate || !endDate){
      return res.status(400).json({message: "Fill all the necessary fields!"})
    }

    const foundElection = await Election.findById(req.params.id)
    if(!foundElection){
      return res.status(400).json({message: "Cannot update! Election not found"})
    }
    
    const update = await Election.findByIdAndUpdate(req.params.id, { title, description, startDate, endDate }, {new: true})
    res.status(200).json({ message: "Election updated successfully", updated: update })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const showResults = async (req, res) => {
  try {
      const { electionId } = req.params;

      // Find the election by ID and populate the candidates
      const election = await Election.findById(electionId).populate('candidates');
      if (!election) {
          return res.status(404).json({ message: 'Election not found' });
      }

      // Extract candidate IDs from the populated election
      const candidateIds = election.candidates.map(candidate => candidate._id);

      // Count votes for each candidate in the election
      const voteCounts = await Vote.aggregate([
          { $match: { election: new mongoose.Types.ObjectId(electionId) } },
          { $group: { _id: '$candidate', count: { $sum: 1 } } }
      ]);

      // Create a map of vote counts for quick lookup
      const voteCountMap = voteCounts.reduce((acc, { _id, count }) => {
          acc[_id.toString()] = count;
          return acc;
      }, {});

      // Fetch candidate details
      const candidates = await Candidate.find({ '_id': { $in: candidateIds } });

      // Map candidates to include party names and votes
      const results = candidates.map(candidate => ({
          name: candidate.name,
          party: candidate.party,
          votes: voteCountMap[candidate._id.toString()] || 0 // Default to 0 if no votes
      }));

      // Sort candidates by vote count in descending order
      results.sort((a, b) => b.votes - a.votes);

      // Send the response with sorted results
      res.json({
          title: election.title,
          description: election.description,
          startDate: election.startDate,
          endDate: election.endDate,
          results
      });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
};

const getElectionStatistics = async (req, res) => {
  try {
    const { electionId } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.isValidObjectId(electionId)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }

    // Find the election by ID and populate the candidates
    const election = await Election.findById(electionId).populate('candidates');
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    // Total number of candidates
    const totalCandidates = election.candidates.length;

    // Total number of votes
    const totalVotes = await Vote.countDocuments({ election: electionId });

    // Votes per candidate
    const votesPerCandidate = await Vote.aggregate([
      { $match: { election: new mongoose.Types.ObjectId(electionId) } },
      { $group: { _id: '$candidate', count: { $sum: 1 } } }
    ]);

    // Create a map of vote counts for quick lookup
    const voteCountMap = votesPerCandidate.reduce((acc, { _id, count }) => {
      acc[_id.toString()] = count;
      return acc;
    }, {});

    // Fetch candidate details
    const candidates = await Candidate.find({ '_id': { $in: election.candidates.map(c => c._id) } });


    // Map candidates to include votes
    const candidateResults = candidates.map(candidate => ({
      name: candidate.name,
      party: candidate.party,
      votes: voteCountMap[candidate._id.toString()] || 0,
      percentage: Math.floor((voteCountMap[candidate._id.toString()] * 100) / totalVotes) || 0
    }));

    // Calculate election duration
    const startDate = new Date(election.startDate);
    const endDate = new Date(election.endDate);
    const durationDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    candidateResults.sort((a, b) => b.votes - a.votes);

    // Response with statistics
    res.json({
      election: {
        title: election.title,
        description: election.description,
        startDate: election.startDate,
        endDate: election.endDate,
        durationDays
      },
      totalCandidates,
      totalVotes,
      votesPerCandidate: candidateResults,
      voterTurnout: "N/A" // Voter turnout can be calculated if you have voter data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createElection,
  getElection,
  listAll,
  deleteElection,
  addCandidateToElection,
  removeCandidateFromElection,
  updateElection,
  showResults, 
  getElectionStatistics
};
