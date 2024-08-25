const express = require('express')
const router = express.Router()

const User = require('../models/user'); // 


// List all users
router.get('/', async (req, res) => {
    try {
      const items = await User.find(); // Fetch all items from the collection
      res.status(200).json(items); // Send the items as JSON response
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
});

// Show a user
router.post('/user/?', (req, res) => {
  res.send('Route to show a user')
})
// Create a user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user instance
    const user = new user({ name, email, password });
    
    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user's information


// Delete a user


  
module.exports = router