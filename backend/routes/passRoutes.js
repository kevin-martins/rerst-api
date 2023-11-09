/**
 * @swagger
 * components:
 *   schemas:
 *     Pass:
 *       type: object
 *       required:
 *         - level
 *       properties:
 *         level:
 *           type: number
 *           description: The level of the Pass
 *           example: 5
 *     PassResponse:
 *       type: object
 *       required:
 *         - level
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Pass
 *         level:
 *           type: number
 *           min: 1
 *           max: 5
 *           description: The level of the Pass
 *         created_at:
 *           type: string
 *           format: data
 *           description: The creation date of the Pass
 *         updated_at:
 *           type: string
 *           format: data
 *           description: The updated date of the Pass
 *       example:
 *         _id: 65469444b2bf7a3df2d877a3
 *         level: 5
 *         created_at: 2023-05-11T12:05:06.157Z
 *         updated_at: 2023-05-11T12:05:06.157Z
 */

const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController');

router.post('/passes', passController.createPass);
router.get('/passes', passController.getAllPasses);
router.get('/passes/:passId', passController.getPassById);
router.put('/passes/:passId', passController.updatePass);
router.delete('/passes/:passId', passController.deletePass);

module.exports = router;
