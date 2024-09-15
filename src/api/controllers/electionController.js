const Election = require('../models/electionModel');
const mongoose = require('mongoose');
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

// Criar uma funcao para mostrar o resultado das eleicoes
const showElectionsResults = async (req, res) => {
  try {

  } catch(error){ error.message }
}

const showResults = async (req, res) => {
  try {
      const election = await Election.findById(req.params.electionId).populate('candidates');
      console.log(election)
      if (!election) {
          return res.status(404).send('Election not found');
      }

      // Fetch candidate details
      const candidates = await Candidate.find({ '_id': { $in: election.candidates } });

      // Map candidates to include party names
      const results = candidates.map(candidate => ({
          name: candidate.name,
          party: candidate.party,
          votes: Math.floor(Math.random() * 1000) // Simulated votes
      }));

      // Sort candidates by vote count in descending order
      results.sort((a, b) => b.votes - a.votes);

      res.json({
          title: election.title,
          description: election.description,
          startDate: election.startDate,
          endDate: election.endDate,
          results
      });

  } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
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
  showResults
};
