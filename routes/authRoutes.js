const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register a new user
router.route('/register').post(register);

// Login user
router.route('/login').post(login);

module.exports = router;
