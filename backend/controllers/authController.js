const bcrypt = require('bcrypt');
const { User } = require('../models');
const createUser = require('../helpers/createUser');
const userController = require('./userController');

exports.logIn = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phone_number: phoneNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Error: invalid phone number or password' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.signIn = async (req, res) => {
  try {
    const { phoneNumber, password, passwordConfirmation } = req.body;
    const phoneAlreadyUsed = await User.findOne({ phone_number: phoneNumber });
    if (phoneAlreadyUsed) {
      return res.status(401).json({ message: 'Error: there is a probleme with the form' });
    }

    if (password !== passwordConfirmation) {
      return res.status(401).json({ message: 'Error: the passwords does not match' });
    }

    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.changePassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    if (!hashedPassword) {
      return res.status(404).json({ message: 'Erorr: the hashed password has not successfully been created' });
    } 

    const user = await User.findByIdAndUpdate(req.params.userId, { password: hashedPassword }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Error: user has not successfully been updated' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}