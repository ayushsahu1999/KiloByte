const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.get('/login', authController.login);
router.post('/driver_signup', authController.driverSignup);
router.get('/driver_login', authController.driverLogin);
router.post('/admin_signup', authController.adminSignup);
router.get('/admin_login', authController.adminLogin);

module.exports = router;