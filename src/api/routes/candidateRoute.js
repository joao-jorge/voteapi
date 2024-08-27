const express = require('express')
const Route = express.Router()
const Candidate = require('../controllers/candidateController')

Route.post('/', Candidate.create);
Route.get('/', Candidate.list);
Route.get('/:id', Candidate.get);
Route.delete('/:id', Candidate.remove);
Route.put('/:id', Candidate.update);

module.exports = Route