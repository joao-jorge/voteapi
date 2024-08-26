const express = require('express')
const Route = express.Router()
const Election = require('../controllers/election')

Route.post('/', Election.createElection);
Route.get('/:id', Election.getElection);
Route.get('/', Election.listAll);
Route.delete('/:id', Election.deleteElection)

module.exports = Route