const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/add-items', adminController.addItem);
router.get('/orders', adminController.orders);
router.get('/drivers', adminController.drivers);
router.post('/assign', adminController.assignDriver);

module.exports = router;