const Candidate = require('../controllers/candidateController')
const auth = require('../middlewares/authMiddleware')
const express = require('express')
const Route = express.Router()

Route.use(auth.authentication)
Route.post('/', auth.authorization(['admin']), Candidate.create);
Route.get('/', auth.authorization(['admin']), Candidate.list);
Route.get('/:id', auth.authorization(['admin']), Candidate.get);
Route.delete('/:id', auth.authorization(['admin']), Candidate.remove);
Route.put('/:id', auth.authorization(['admin']), Candidate.update);

module.exports = Route