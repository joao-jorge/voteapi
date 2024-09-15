const Candidate = require('../models/candidateModel');
const mongoose = require('mongoose')
const { validCandidateInput } = require('../validations/validation')

const create = async (req, res) => {
    try {
      const { name, party } = req.body;

      if(!name || !party){
        return res.status(400).json({message: "Fill all the fields!"})
      }

      if(!validCandidateInput(name) || !validCandidateInput(party)){
        return res.status(400).json({message: "Name and Party cannot contain invalid inputs!"})
      }

      const candidate = new Candidate({ name, party });
      await candidate.save();
      res.status(201).json({ message: "Candidate created successfuly", candidate: candidate });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const list = async (req, res) => {
    try {
        const candidates = await Candidate.find(); 

        if(!candidates){
          return res.status(400).json({message: "There's not candidate!"})
        }

        res.status(200).json(candidates); 
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const get = async(req, res) =>{
    try {
      // Validate if the id is a valid ObjectId
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid candidate ID format!" });
      }

      const candidate = await Candidate.findById(req.params.id);
      if(!candidate){
        return res.status(400).json({message: "Candidate not found!"})
      }
      res.status(200).json(candidate);
    } catch (error) { res.status(500).json({message: error.message}); }
}

const remove = async (req, res) => {
    try {
      // Validate if the id is a valid ObjectId
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid candidate ID format!" });
      }

      const candidate = await Candidate.findById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ message: 'candidate not found' });
      }
      const deleteCandidate = await Candidate.findByIdAndDelete(candidate);
      res.status(200).json({ message: 'Candidate deleted successfully', deletedCandidate: deleteCandidate });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const update = async(req, res) => {
    try{
      // Validate if the id is a valid ObjectId
      if (!mongoose.isValidObjectId(req.params.id)) 
        return res.status(400).json({ message: "Invalid candidate ID format!" });
      
      const { name, party } = req.body;
      if(!name || !party)
        return res.status(400).json({message: "Fill all the fields!"})

      if(!validCandidateInput(name) || !validCandidateInput(party)){
        return res.status(400).json({message: "Name and Party cannot contain invalid inputs!"})
      }
      const candidate = await Candidate.findById(req.params.id)
      if(!candidate){
        return res.status(404).json({message: "Candidate not found"});
      }
      const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, { name, party }, {new: true})
      res.status(200).json({ message: 'Candidate updated successfully', updatedCandidate: updatedCandidate })
    } catch(error) {res.status(500).json({message: error.message})}
}

module.exports = {
    create,
    list,
    get,
    remove,
    update
}