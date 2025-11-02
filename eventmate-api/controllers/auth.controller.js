const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to create a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    // 1. Get email and password from the request body
    const { email, password } = req.body;

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Create a new user document (password will be hashed by the 'pre-save' hook in model)
    const user = new User({
      email,
      password,
    });

    // 4. Save the user to the database
    await user.save();

    // 5. Send back a response with the new user's ID and a token
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc    Authenticate/login a user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    // 1. Get email and password from request body
    const { email, password } = req.body;

    // 2. Find the user in the database by email
    const user = await User.findOne({ email });

    // 3. If user doesn't exist, send error
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 4. Compare the provided password with the stored (hashed) password
    const isMatch = await bcrypt.compare(password, user.password);

    // 5. If passwords don't match, send error
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 6. If they match, send back user info and a token
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

module.exports = {
  registerUser,
  loginUser,

};
