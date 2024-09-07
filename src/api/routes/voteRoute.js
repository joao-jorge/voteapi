
const Vote = require('../controllers/voteController')
const auth = require('../middlewares/authMiddleware')
const express = require('express')
const Route = express.Router()

Route.use(auth.authentication);
Route.post('/:idElection/:idUser/:idCandidate', auth.authorization(['user', 'admin']), Vote.castVote)

module.exports = Route