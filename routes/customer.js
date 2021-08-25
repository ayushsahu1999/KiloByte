const express = require('express');

const orderController = require('../controllers/orders');

const router = express.Router();

router.post('/add-to-cart', orderController.addToCart);
router.post('/confirm', orderController.confirm);

module.exports = router;