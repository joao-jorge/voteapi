const User = require('../models/userModel');

const validateUserInput = async (name, email, password) =>{
    if (!name || typeof name !== 'string' || name.trim() === '') 
      return 'Name is required and must be a string';
    if (!email || !/^[^\s@]+@[^\s@]+\.(?!.*\d)[^\s@]+$/.test(email)) 
      return 'Invalid email format';
    if (!password || password.length < 6)
      return 'Password must be at least 6 characters long';
}

const findUserByEmail = (email) => {
    const findUser = User.findOne({email: email});
    return findUser;
}

const validCandidateInput = (input) => {
    // Allow letters, spaces, hyphens, and accented characters
    const regex = /^[\p{L}\s\-]+$/u;
    return regex.test(input);
};

module.exports = {
    validateUserInput,
    findUserByEmail,
    validCandidateInput
}