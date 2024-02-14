const express = require('express');
const router = express.Router();
const { register, login, sendVerificationEmail,verifyEmail, requestPasswordReset, resetPassword, getLastLogin } = require('../controllers/authController');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/send-verification-email').post(sendVerificationEmail);
router.route('/verify/:token').get(verifyEmail);
router.route('/request-password-reset').post(requestPasswordReset);
router.route('/reset-password').post(resetPassword);
router.route('/:id/last-login').get(getLastLogin); 
module.exports = router;
