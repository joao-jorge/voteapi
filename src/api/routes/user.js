const express = require('express')
const router = express.Router()

const User = require('../models/user'); // 

// Create a user
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users); 
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// Show a user
router.get('/:id', async(req, res) =>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) { res.status(500).json({message: error.message}); }
});







/*
// Update user's information


// Delete a user
*/

  
module.exports = router