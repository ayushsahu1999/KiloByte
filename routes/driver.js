const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver');

router.post('/update-status', driverController.statusUpdate);
router.get('/get-orders', driverController.getOrders);

module.exports = router;