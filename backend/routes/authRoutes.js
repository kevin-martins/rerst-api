/**
 * @swagger
 * components:
 *   schemas:
 *     LogIn:
 *       type: object
 *       required:
 *         - phone_number
 *         - password
 *       properties:
 *         phone_number:
 *           type: string
 *           description: The phone number (identifier) of the User
 *           example: "0758941358"
 *         password:
 *           type: string
 *           description: The password of the User
 *     SignIn:
 *       type: object
 *       required:
 *         - phone_number
 *         - password
 *         - password_confirmation
 *       properties:
 *         phone_number:
 *           type: string
 *           description: The phone number (identifier) of the User
 *           example: "0758941358"
 *         password:
 *           type: string
 *           description: The password of the User
 *           example: string
 *         password_confirmation:
 *           type: string
 *           description: The password of the User a second time to prevent misspellings
 *           example: string
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.logIn);
router.post('/signin', authController.signIn);

module.exports = router;