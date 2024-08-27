const Candidate = require('../models/candidateModel');

const create = async (req, res) => {
    try {
      const { name, party } = req.body;
      const candidate = new Candidate({ name, party });
      await candidate.save();
      res.status(201).json({ message: "Candidate created successfuly", candidate: candidate });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const list = async (req, res) => {
    try {
        const candidates = await Candidate.find(); 
        res.status(200).json(candidates); 
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const get = async(req, res) =>{
    try {
      const candidate = await Candidate.findById(req.params.id);
      res.status(200).json(candidate);
    } catch (error) { res.status(500).json({message: error.message}); }
}

const remove = async (req, res) => {
    try {
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
      const { name, party } = req.body;
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