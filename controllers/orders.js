const Order = require('../models/orders');

exports.confirm = async (req, res, next) => {
    const customerId = req.body.customerId;

    const order = new Order(customerId);
    await order.addCart();
    order.save();
}