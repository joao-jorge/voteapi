const express = require('express')
const Vote = require('../controllers/voteController')
const Route = express.Router()

Route.post('/:idElection/:idUser/:idCandidate', Vote.castVote)

module.exports = Route