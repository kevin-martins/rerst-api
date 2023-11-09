/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - address
 *         - phone_number
 *         - required_pass_level
 *         - required_age_level
 *       properties:
 *         address:
 *           type: string
 *           description: The address of the Place
 *         phone_number:
 *           type: string
 *           description: The phone number of the Place
 *         required_pass_level:
 *           type: number
 *           description: The minimum level required to get this Place
 *         required_age_level:
 *           type: number
 *           description: The minimum age required to get this Place
 *       example:
 *         address: 25 rue des Champs, 91174 Corbeil-Essonnes
 *         phone_number: "0644621315"
 *         required_pass_level: 3
 *         required_age_level: 18
 *     PlaceResponse:
 *       type: object
 *       required:
 *         - address
 *         - phone_number
 *         - required_pass_level
 *         - required_age_level
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Place
 *         address:
 *           type: string
 *           description: The address of the Place
 *         phone_number:
 *           type: string
 *           description: The phone number of the Place
 *         required_pass_level:
 *           type: number
 *           description: The minimum level required to get this Place
 *         required_age_level:
 *           type: number
 *           description: The minimum age required to get this Place
 *       example:
 *         _id: 6546852546e2791074fd8f18
 *         address: 25 Rue des Champs, 91174 Corbeil-Essonnes
 *         phone_number: "0644621315"
 *         required_pass_level: 3
 *         required_age_level: 18
 */

const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

router.post('/places', placeController.createPlace);
router.get('/places', placeController.getAllPlaces);
router.get('/places/:placeId', placeController.getPlaceById);
router.put('/places/:placeId', placeController.updatePlace);
router.delete('/places/:placeId', placeController.deletePlace);

module.exports = router;
