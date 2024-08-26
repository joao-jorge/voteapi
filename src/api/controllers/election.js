const Election = require('../models/election')


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
];