const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/user') 

// Create a user
router.post('/', createUser);

// List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// Get a user
router.get('/:id', async(req, res) =>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) { res.status(500).json({message: error.message}); }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deleteUser = await User.findByIdAndDelete(user);
    res.status(200).json({ message: 'User deleted successfully', deletedUser: deleteUser });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// Update user's information
router.put('/:id', async(req, res) => {
  try{
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, {new: true})
    res.status(200).json({ message: 'User updated successfully', updatedUser: updatedUser })
  } catch(error) {res.status(500).json({message: error.message})}
})
  
module.exports = router