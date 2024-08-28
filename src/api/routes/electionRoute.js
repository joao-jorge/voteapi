const express = require('express')
const Route = express.Router()
const Election = require('../controllers/electionController')

Route.post('/', Election.createElection);
Route.get('/:id', Election.getElection);
Route.get('/', Election.listAll);
Route.delete('/:id', Election.deleteElection)
Route.put('/:electionId/:candidateId', Election.addCandidateToElection)
Route.delete('/:electionId/:candidateId', Election.removeCandidateFromElection)

module.exports = Route