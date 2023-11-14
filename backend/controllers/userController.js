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
 *     summary: Get the user access on a place by id
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
 *         description: The user has not been authorized
 *       404:
 *         description: The user, the place or the pass have not been found
 *       500:
 *         description: Some server error
 * /users/{id}/places:
 *   post:
 *     summary: Get the user's places by id
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
 *         description: The user's places by user id
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

exports.createUser = async (req, res) => {
  try {
    const pass = await Pass.create({ level: 1 });
    if (!pass) {
      return res.status(404).json({ message: 'Pass has not been created' });
    }

    const user = await User.create({
      ...req.body,
      pass_id: pass._id
    });
    if (!user) {
      return res.status(404).json({ message: 'User has not been created' });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: 'Users has not been found' });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User has not been found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User has not been updated' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User has not been updated' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.checkPlaceAccess = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User has not been found' });
    }

    const pass = await Pass.findById(user.pass_id);
    if (!pass) {
      return res.status(404).json({ message: 'Pass has not been found' });
    }

    const place = await Place.findById(req.body.placeId);
    if (!place) {
      return res.status(404).json({ message: 'Place has not been found' });
    }

    if (user.age >= place.required_age_level && pass.level >= place.required_pass_level) {
      return res.status(200).json(place);
    } else {
      return res.status(403).json({ message: "Unauthorized" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getPlacesByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User has not been found' });
    }

    const pass = await Pass.findById(user.pass_id);
    if (!pass) {
      return res.status(404).json({ message: 'Pass has not been found' });
    }
    
    const places = await Place.find({
      required_age_level: { $lte: user.age },
      required_pass_level: { $lte: pass.level }
    });
    if (!places) {
      return res.status(404).json({ message: 'Places has not been found' });
    }

    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}