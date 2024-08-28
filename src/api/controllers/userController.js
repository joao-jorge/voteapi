const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const create = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      if(await findUserByEmail(email)){
        return res.status(400).json({message: "User already exists" });
      } 

      // Verify is the data are inserted correctly
      const notValid = await validateInputs(name, email, password)
      if(notValid)
        return res.status(500).json({ message: notValid })

      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: "User created successfuly", user: user });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const list = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const get = async(req, res) =>{
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) { res.status(500).json({message: error.message}); }
}

const remove = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const deleteUser = await User.findByIdAndDelete(user);
      res.status(200).json({ message: 'User deleted successfully', deletedUser: deleteUser });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

const update = async(req, res) => {
    try{
      const { name, email, password } = req.body;
      const user = await User.findById(req.params.id)
      if(!user){
        return res.status(404).json({message: "User not found"});
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, {new: true})
      res.status(200).json({ message: 'User updated successfully', updatedUser: updatedUser })
    } catch(error) {res.status(500).json({message: error.message})}
}

const findUserByEmail = (email) => {
  const findUser = User.findOne({email: email});
  return findUser;
}

const validateInputs = async (name, email, password) =>{
  if (!name || typeof name !== 'string' || name.trim() === '') 
    return 'Name is required and must be a string';
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) 
    return 'Invalid email format';
  if (!password || password.length < 6)
    return 'Password must be at least 6 characters long';
}

module.exports = {
    create,
    list,
    get,
    remove,
    update
}