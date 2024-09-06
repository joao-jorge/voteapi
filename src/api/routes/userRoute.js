const express = require('express')
const router = express.Router()
const userModel = require('../controllers/userController') 
const auth = require('../middlewares/authMiddleware')

// Not protected routes
router.post('/', userModel.create);
router.post('/login', userModel.login);



router.use(auth.authentication)
router.get('/', userModel.list);
router.get('/:id', userModel.get);
router.delete('/:id', auth.authorization(['user']), userModel.remove);
router.put('/:id', auth.authorization(['admin']), userModel.update);
  
module.exports = router