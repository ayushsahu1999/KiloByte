const Customer = require('../models/customers');
const Order = require('../models/orders');

exports.addToCart = (req, res, next) => {
    const custMob = req.body.mobile;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    Customer.findByMobile(custMob)
    .then(customer => {
        new Customer(customer.name, customer.mobile, customer.password, customer.cart, customer._id).addToCart(itemId, quantity || 1);

        res.status(200).json({status: 'created'});
    })
    .catch(err => {
        next(err);
    })
}

exports.confirm = (req, res, next) => {
    const mobile = req.body.mobile;

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
                res.status(200).json({status: 'created'})
            });
        })
        
    })
    .catch(err => {
        // console.log(err);
        next(err);
    })
    
}