/**
 * @swagger
 * tags:
 *   name: Places
 *   description: The places managing API
 * /places:
 *   get:
 *     summary: List all the places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: The list of all the places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlaceResponse'
 *       404:
 *         description: The places has not been found
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new place
 *     tags: [Places]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       201:
 *         description: The place has successfully been found created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceResponse'
 *       404:
 *         description: The place has not been created
 *       500:
 *         description: Some server error
 * /places/{id}:
 *   get:
 *     summary: Get the place by id
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place id
 *     responses:
 *       200:
 *         description: The pass has successfully been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceResponse'
 *       404:
 *         description: The place has not been found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update the place by the id
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       200:
 *         description: The place has successfully been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceResponse'
 *       404:
 *         description: The place has not been updated
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the place by id
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place id
 *     responses:
 *       200:
 *         description: The place has successfully been deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceResponse'
 *       404:
 *         description: The place has not been deleted
 *       500:
 *         description: Some server error
 */

const { isLevelValid, isAgeValid, isObjectKeysDefined } = require('../helpers/validator');
const { Place } = require('../models');

exports.createPlace = async (req, res) => {
  try {
    if (!isObjectKeysDefined(req.body, ["required_pass_level", "required_age_level"])) {
      return res.status(400).json({ message: 'Error: there is required fields missing' });
    }

    if (!isLevelValid(req.body.required_pass_level)) {
      return res.status(400).json({ message: 'Error: level beyond boundaries' });
    }

    if (!isAgeValid(req.body.required_age_level)) {
      return res.status(400).json({ message: 'Error: age beyond boundaries' });
    }

    const place = await Place.create(req.body);
    if (!place) {
      return res.status(404).json({ message: 'Error: place has not successfully been created' });
    }

    res.status(201).json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getAllPlaces = async (req, res) => {
  try {
    const place = await Place.find({});
    if (!place) {
      return res.status(404).json({ message: 'Error: places has not successfully been found' });
    }

    res.status(200).json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.placeId);
    if (!place) {
      return res.status(404).json({ message: 'Error: place has not successfully been found' });
    }

    res.status(200).json(place);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this place does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.updatePlace = async (req, res) => {
  try {
    if (!isLevelValid(req.body.required_pass_level)) {
      return res.status(400).json({ message: 'Error: level beyond boundaries' });
    }

    if (!isAgeValid(req.body.required_age_level)) {
      return res.status(400).json({ message: 'Error: age beyond boundaries' });
    }

    const place = await Place.findByIdAndUpdate(req.params.placeId, req.body, { new: true });
    if (!place) {
      return res.status(404).json({ message: 'Error: place has not successfully been updated' });
    }

    res.status(200).json(place);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this place does not exist' });
    } else if (err.message.includes('duplicate key error')) {
      return res.status(400).json({ message: 'Error: duplicate key found' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.placeId);
    if (!place) {
      return res.status(404).json({ message: 'Error: place has not successfully been deleted' });
    }

    res.status(200).json(place);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this place does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}