/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - age
 *         - phone_number
 *         - address
 *       properties:
 *         pass_id:
 *           type: string
 *           description: The pass id of the current pass the user have
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         age:
 *           type: number
 *           description: The age of the user
 *         phone_number:
 *           type: string
 *           description: The phone number of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *       example:
 *         pass_id: The New Turing Omnibus
 *         first_name: Kevin
 *         last_name: Martins
 *         age: 25
 *         phone_number: "0758941358"
 *         address: 25 rue des Champs, 91174 Corbeil-Essonnes
 *     UserResponse:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - age
 *         - phone_number
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         pass_id:
 *           type: string
 *           description: The pass id of the current pass the user have
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         age:
 *           type: number
 *           description: The age of the user
 *         phone_number:
 *           type: string
 *           description: The phone number of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *       example:
 *         _id: 6546852446e2791074fd8f13
 *         pass_id: 654697edb2bf7a3df2d877ac
 *         first_name: Kevin
 *         last_name: Martins
 *         age: 25
 *         phone_number: "0758941358"
 *         address: 25 rue des Champs, 91174 Corbeil-Essonnes
 *     UserAccess:
 *       type: object
 *       required:
 *         - placeId
 *       properties:
 *         placeId:
 *           type: string
 *           description: The place id
 *           example: 654a7b1fd1dcc64593f2f933
 *     UserAccessResponse:
 *       type: object
 *       properties:
 *         hasAccess:
 *           type: boolean
 *           description: The place's access value
 *           example: true
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

router.post('/users/:userId/access', UserController.checkAccess);
router.get('/users/:userId/places', UserController.getPlacesByUserId);

module.exports = router;
