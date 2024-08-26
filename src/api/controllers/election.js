/*const Election = require('../models/election')


const createElection = async (req, res) => {
  res.send('createElection')
}

const getElection = async (req, res) => {
    res.send('getElection')
}

const listAll = async (req, res) => {
    res.send('listAll')
}

const deleteElection = async (req, res) => {
    res.send('deleteElection')
}

module.exports = [
    createElection,
    getElection, 
    deleteElection,
    listAll
];*/

const Election = require('../models/election');

const createElection = async (req, res) => {
  try {
    // Obter os dados da eleição do corpo da requisição
    const { title, description, candidates, startDate, endDate } = req.body;

    // Criar uma nova eleição
    const election = new Election({
      title,
      description,
      candidates,
      startDate,
      endDate
    });

    // Salvar a eleição no banco de dados
    await election.save();

    // Retornar a eleição criada
    res.status(201).json(election);
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

module.exports = {
  createElection,
  getElection,
  listAll,
  deleteElection
};
