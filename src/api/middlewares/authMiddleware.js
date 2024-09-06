const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const User = require('../models/userModel')

const authentication = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Fetch user data from the database
    const user = await User.findById(decoded.userId).exec();
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach full user data to the request object
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};


const authorization = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied:'});
  }
  next();
};

module.exports = {
  authentication,
  authorization
}
