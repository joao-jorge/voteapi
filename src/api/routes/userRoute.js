const express = require('express')
const userModel = require('../controllers/userController') 
const auth = require('../middlewares/authMiddleware')
const router = express.Router()

// Not protected routes
router.post('/', userModel.create);
router.post('/login', userModel.login);



router.use(auth.authentication) // all routes under need auth
// Protected routes
router.get('/', auth.authorization(['admin']), userModel.list);
router.get('/:id', auth.authorization(['admin']), userModel.get);
router.delete('/:id', auth.authorization(['admin']), userModel.remove);
router.put('/:id', auth.authorization(['admin', 'user']), userModel.update);
  
module.exports = router