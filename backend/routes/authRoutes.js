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
 *         - first_name
 *         - last_name
 *         - age
 *         - phone_number
 *         - password
 *         - password_confirmation
 *       properties:
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *           example: Jean
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *           example: David
 *         age:
 *           type: number
 *           description: The age of the user
 *           example: 38
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