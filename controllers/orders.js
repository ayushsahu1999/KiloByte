const Customer = require('../models/customers');
const Order = require('../models/orders');

exports.addToCart = (req, res, next) => {
    if (!req.isAuth || req.userType !== 'customer') {
        const err = new Error('No Access');
        err.statusCode = 404;
        throw err;
    }

    const custMob = req.mobile;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    Customer.findByMobile(custMob)
    .then(customer => {
        new Customer(customer.name, customer.mobile, customer.password, customer.cart, customer._id).addToCart(itemId, quantity || 1);

        res.status(200).json({status: 'Added Succesfully'});
    })
    .catch(err => {
        next(err);
    })
}

exports.confirm = (req, res, next) => {

    if (!req.isAuth || req.userType !== 'customer') {
        const err = new Error('No Access');
        err.statusCode = 404;
        throw err;
    }

    const mobile = req.mobile;

    Customer.findByMobile(mobile)
    .then(checkCust => {
        if (!checkCust) {
            const err = new Error('Cannot find customer');
            err.statusCode = 401;
            throw err;
        }
    
        const order = new Order(checkCust._id);
        order.addCart().then(r => {
            // console.log(order);
            order.save().then(result => {
                res.status(200).json({status: 'Order Placed Successfully'})
            });
        })
        
    })
    .catch(err => {
        // console.log(err);
        next(err);
    })
    
}