const bcrypt = require('bcrypt');
const { validateUserInput, findUserByEmail } = require('../validations/validation')
const User = require('../models/userModel');
const mongoose = require('mongoose')

const create = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if(!name || !email || !password)
        return res.status(400).json({message: "Fill all the fields!"})

      // Verify is the data are inserted correctly
      const notValid = await validateUserInput(name, email, password)
      if(notValid)
        return res.status(500).json({ message: notValid })

      if(await findUserByEmail(email))
        return res.status(400).json({message: "There is a user with this email" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: "User created successfuly", user: user });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const list = async (req, res) => {
    try {
        const foundUsers = await User.find(); 
        if(!foundUsers)
          return res.status(400).json({message: "There's no user."})

        res.status(200).json({ foundUsers }); 
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const get = async(req, res) =>{
    try {
      if (!mongoose.isValidObjectId(req.params.id)) 
        return res.status(400).json({ message: "Invalid ID format!" });

      const foundUser = await User.findById(req.params.id);
      if(!foundUser)
        return res.status(400).json({message: "User not found!"})

      res.status(200).json(foundUser);
    } catch (error) { res.status(500).json({message: error.message}); }
}

const remove = async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) 
        return res.status(400).json({ message: "Invalid ID format!" });

      const foundUser = await User.findById(req.params.id);
      if (!foundUser)
        return res.status(404).json({ message: 'User not found' });
    
      const deleteUser = await User.findByIdAndDelete(foundUser);
      res.status(200).json({ message: 'User deleted successfully', deletedUser: deleteUser });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const update = async(req, res) => {
    try{
      if (!mongoose.isValidObjectId(req.params.id)) 
        return res.status(400).json({ message: "Invalid ID format!" });

      const { name, email, password } = req.body;
      if(!name || !email || !password)
        return res.status(400).json({message: "Fill all the fields!"});

      if(await findUserByEmail(email))
        return res.status(400).json({message: "Cannot update! this email is being used." });

      // Verify is the data are inserted correctly
      const notValid = await validateUserInput(name, email, password)
      if(notValid)
        return res.status(500).json({ message: notValid })

      const foundUser = await User.findById(req.params.id);
      if (!foundUser) 
        return res.status(404).json({ message: 'User not found' });

      const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, {new: true})
      res.status(200).json({ message: 'User updated successfully', updatedUser: updatedUser })
    } catch(error) {res.status(500).json({message: error.message})}
}

module.exports = {
    create,
    list,
    get,
    remove,
    update
}