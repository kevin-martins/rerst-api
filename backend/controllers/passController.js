/**
 * @swagger
 * tags:
 *   name: Passes
 *   description: The passes managing API
 * /passes:
 *   get:
 *     summary: List all the passes
 *     tags: [Passes]
 *     responses:
 *       200:
 *         description: The list of all the passes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PassResponse'
 *       404:
 *         description: The passes has not been found
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new pass
 *     tags: [Passes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pass'
 *     responses:
 *       201:
 *         description: The pass has successfully been found created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PassResponse'
 *       404:
 *         description: The pass has not been created
 *       500:
 *         description: Some server error
 * /passes/{id}:
 *   get:
 *     summary: Get the pass by id
 *     tags: [Passes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pass id
 *     responses:
 *       200:
 *         description: The pass has successfully been found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PassResponse'
 *       404:
 *         description: The pass has not been found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update the pass by the id
 *     tags: [Passes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pass id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pass'
 *     responses:
 *       200:
 *         description: The pass has successfully been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PassResponse'
 *       404:
 *         description: The pass has not been updated
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the pass by id
 *     tags: [Passes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pass id
 *     responses:
 *       200:
 *         description: The pass has successfully been deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PassResponse'
 *       404:
 *         description: The pass has not been deleted
 *       500:
 *         description: Some server error
 */

const { isLevelValid } = require('../helpers/validator');
const { Pass } = require('../models');

exports.createPass = async (req, res) => {
  try {
    if (!isLevelValid(req.body.level)) {
      return res.status(400).json({ message: 'Error: pass level beyond boundaries' });
    }

    const pass = await Pass.create(req.body);
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been created' });
    }

    res.status(201).json(pass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getAllPasses = async (req, res) => {
  try {
    const pass = await Pass.find({});
    if (!pass) {
      return res.status(404).json({ message: 'Error: passes has not successfully been found' });
    }

    res.status(200).json(pass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getPassById = async (req, res) => {
  try {
    const pass = await Pass.findById(req.params.passId);
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been found' });
    }

    res.status(200).json(pass);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this pass does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.updatePass = async (req, res) => {
  try {
    if (!isLevelValid(req.body.level)) {
      return res.status(400).json({ message: 'Error: pass level beyond boundaries' });
    }

    const pass = await Pass.findByIdAndUpdate(
      req.params.passId,
      {
        ...req.body,
        updated_at: Date.now()
      },
      { new: true }
    );
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been updated' });
    }

    res.status(200).json(pass);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this pass does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}

exports.deletePass = async (req, res) => {
  try {
    const pass = await Pass.findByIdAndDelete(req.params.passId);
    if (!pass) {
      return res.status(404).json({ message: 'Error: pass has not successfully been deleted' });
    }

    res.status(200).json(pass);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ message: 'Error: the id for this pass does not exist' });
    }

    res.status(500).json({ error: err.message });
  }
}