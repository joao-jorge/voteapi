const User = require('../models/user');

const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: "User created successfuly", user: user });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

module.exports = {
    createUser,
}