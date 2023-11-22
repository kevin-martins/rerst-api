/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /login:
 *   post:
 *     summary: Log a User in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogIn'
 *     responses:
 *       200:
 *         description: The logged user data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Some required parameters are missing in your request
 *       401:
 *         description: The request contains data that could not be validated
 *       404:
 *         description: The user has not been found
 *       500:
 *         description: Some server error
 * /signin:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       201:
 *         description: The user has successfully been created and log as him
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Some required parameters are missing in your request
 *       401:
 *         description: The request contains data that could not be validated
 *       404:
 *         description: The user has not been created
 *       500:
 *         description: Some server error
 */

const bcrypt = require('bcrypt');
const { User } = require('../models');
const createUser = require('../helpers/createUser');
const userController = require('./userController');
const { isObjectKeysDefined } = require('../helpers/validator');

exports.logIn = async (req, res) => {
  try {
    if (!isObjectKeysDefined(req.body, ["phone_number", "password"])) {
      return res.status(400).json({ message: 'Error: there is required fields missing' });
    }

    const { phone_number, password } = req.body;
    const user = await User.findOne({ phone_number });
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
    if (!isObjectKeysDefined(req.body, ["first_name", "last_name", "age", "phone_number", "password"])) {
      return res.status(400).json({ message: 'Error: there is required fields missing' });
    }
    const { password, password_confirmation } = req.body;
    if (password !== password_confirmation) {
      return res.status(401).json({ message: 'Error: the passwords does not match' });
    }

    const user = await createUser(req.body);
    if (user?.error) {
      return res.status(404).json({ message: user.error });
    }

    delete user._doc.password;
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(401).json({ message: 'Error: trying to duplicate a unique key' });
    }

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