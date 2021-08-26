const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver');

router.post('/update-status', driverController.statusUpdate);

module.exports = router;