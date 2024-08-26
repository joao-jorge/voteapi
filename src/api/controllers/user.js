const User = require('../models/user');

const create = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
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

module.exports = {
    create,
    list,
    get,
    remove,
    update
}