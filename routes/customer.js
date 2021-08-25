const express = require('express');

const orderController = require('../controllers/orders');

const router = express.Router();

router.post('/confirm', orderController.confirm);