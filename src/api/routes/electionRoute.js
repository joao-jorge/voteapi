const Election = require('../controllers/electionController')
const auth = require('../middlewares/authMiddleware')
const express = require('express')
const Route = express.Router()

Route.get('/election-result/:electionId', Election.showResults);
Route.get('/election-statistics/:electionId', Election.getElectionStatistics)

Route.use(auth.authentication)
Route.post('/', auth.authorization(['admin']), Election.createElection);
Route.get('/:electionId', auth.authorization(['admin', 'user']), Election.getElection);
Route.get('/', auth.authorization(['admin', 'user']), Election.listAll);
Route.delete('/:id', auth.authorization(['admin']), Election.deleteElection)
Route.put('/:electionId/:candidateId', auth.authorization(['admin']), Election.addCandidateToElection)
Route.delete('/:electionId/:candidateId', auth.authorization(['admin']), Election.removeCandidateFromElection)
Route.put('/:id', auth.authorization(['admin']), Election.updateElection);


module.exports = Route