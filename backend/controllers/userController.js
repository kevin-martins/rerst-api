/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   get:
 *     summary: List all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of all the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: The passes has not been found
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user has successfully been found created
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
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user has successfully been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: The user has not been found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user has successfully been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: The request contains data that could not be validated
 *       404:
 *         description: The user has not been updated
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user has successfully been deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: The user has not been deleted
 *       500:
 *         description: Some server error
 * /users/{id}/access:
 *   get:
 *     summary: Get the place if the user can access it
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAccess'
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceResponse'
 *       403:
 *         description: You are not authorized to access this content
 *       404:
 *         description: The user, the place or the pass have not been found
 *       500:
 *         description: Some server error
 * /users/{id}/places:
 *   post:
 *     summary: Get all the available places for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The available places for a user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlaceResponse'
 *       404:
 *         description: The user, the place or the pass have not been found
 *       500:
 *         description: Some server error
 */

const { User, Pass, Place } = require('../models');
const createUser = require('../helpers/createUser');
const { isPlaceAccessValid, isObjectKeysDefined, isAgeValid } = require('../helpers/validator');

exports.createUser = async (req, res) => {
  try {
    if (!isObjectKeysDefined(req.body, ["first_name", "last_name", "age", "phone_number", "password"])) {
      return res.status(400).json({ message: 'Error: there is required fields missing' });
    }

    if (!isAgeValid(req.body.age)) {
      return res.status(401).json({ message: 'Error: age beyond boundaries' });
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    if (!users) {
      return res.status(404).json({ message: 'Error: users has not successfully been found' });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Error: user has not successfully been found' });
    }

    delete user._doc.password;

    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this user does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, otherData, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Error: user has not successfully been updated' });
    }

    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this user does not exist' });
    } else if (err.code === 11000) {
      return res.status(401).json({ message: 'Error: trying to duplicate a unique key' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Error: user has not successfully been deleted' });
    }

    const pass = await Pass.findByIdAndDelete(user.pass_id);
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been deleted' });
    }

    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this user does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.checkPlaceAccess = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Error: user has not successfully been found' });
    }

    const pass = await Pass.findById(user.pass_id);
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been found' });
    }

    const place = await Place.findById(req.body.placeId);
    if (!place) {
      return res.status(404).json({ message: 'Error: place has not successfully been found' });
    }

    if (!isPlaceAccessValid(user.age, place.required_age_level, pass.level, place.required_pass_level)) {
      return res.status(403).json({ message: 'Error: you are not authorized to access this content' })
    }

    res.status(200).json(place);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this user does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.getPlacesByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Error: user has not successfully been found' });
    }

    const pass = await Pass.findById(user.pass_id);
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been found' });
    }
    
    const places = await Place.find({
      required_age_level: { $lte: user.age },
      required_pass_level: { $lte: pass.level }
    });
    if (!places) {
      return res.status(404).json({ message: 'Error: places has not successfully been found' });
    }

    res.status(200).json(places);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this user does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}