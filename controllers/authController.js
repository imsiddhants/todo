const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { generateToken, verifyToken } = require('../services/tokenService');
const { sendMagicLink } = require('../services/emailService');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(email, hashedPassword);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const token = generateToken({ userId: user.id });
    await sendMagicLink(email, token);
    res.status(200).json({ message: 'Magic link sent to email' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const verify = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = verifyToken(token);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

module.exports = {
  register,
  login,
  verify,
};
