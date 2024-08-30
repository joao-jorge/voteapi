const Election = require('../models/electionModel');
const Candidate = require('../models/userModel')
const { format } = require('date-fns');

const createElection = async (req, res) => {
  try {
    const { title, description, candidateIds, startDate, endDate } = req.body;

    // Validate candidate IDs
    const candidates = await Candidate.find({ _id: { $in: candidateIds } });
    if (candidates.length !== candidateIds.length) {
      return res.status(400).json({ error: 'One or more candidate IDs are invalid' });
    }

    // Get the current date and format it
    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

    // Create a new Election instance
    const election = new Election({
      title,
      description,
      candidates, // Store candidate IDs directly; Mongoose will handle the population
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
    const elections = await Election.find();
    res.status(200).json(elections);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteElection = async (req, res) => {
  try {
    const { id } = req.params;
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
    const election = await Election.findById(req.params.electionId)
    if(!election)
      return res.status(400).json({message: "Election not found!"});

    const { candidateId } = req.params;
    if(election.candidates.includes(candidateId))
      return res.status(400).json({message: "Candidate is already in the election", candidateId})
    
    // Add candidate to the election
    election.candidates.push(candidateId)
    await election.save()
    res.status(200).json({message: "Candidate added successfuly in the election"});
  } catch (error) {
    res.status(200).json({message: error.message})
  }
}

const removeCandidateFromElection = async (req, res) =>{
  try {
    const election = await Election.findById(req.params.electionId)
    if(!election)
      return res.status(400).json({message: "Election not found!"});

    const { candidateId } = req.params;
    if(!election.candidates.includes(candidateId))
      return res.status(400).json({message: "Candidate is not in the election", candidateId})
    
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
    const { id } = req.params

    const foundElection = await Election.findById(id)
    if(!foundElection){
      return res.status(400).json({message: "Cannot update! Election not found"})
    }
    
    const update = await Election.findByIdAndUpdate(id, { title, description, startDate, endDate }, {new: true})
    res.status(200).json({ message: "Election updated successfully", updated: update })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
  createElection,
  getElection,
  listAll,
  deleteElection,
  addCandidateToElection,
  removeCandidateFromElection,
  updateElection
};
