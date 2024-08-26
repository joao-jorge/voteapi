const express = require('express')
const router = express.Router()
const userModel = require('../controllers/user') 

router.post('/', userModel.create);
router.get('/', userModel.list);
router.get('/:id', userModel.get);
router.delete('/:id', userModel.remove);
router.put('/:id', userModel.update);
  
module.exports = router