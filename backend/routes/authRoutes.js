const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.logIn);
router.post('/signin', authController.signIn);

module.exports = router;