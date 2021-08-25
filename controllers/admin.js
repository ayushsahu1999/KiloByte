const Admin = require('../models/admin');
const Order = require('../models/orders');

exports.addItem = (req, res, next) => {
    Admin.findByMobile(req.body.mobile)
    .then(admin => {
        if (!admin) {
            const err = new Error('Invalid credentials');
            err.statusCode = 401;
            throw err;
        }

        const item = {
            name: req.body.name,
            category: req.body.category,
            addresses: req.body.addresses
        }
        new Admin(admin.name, admin.mobile).createItems(item);
        
        res.status(200).json({status: 'Item created!'});
    })
    .catch(err => {
        next(err);
    });
}

exports.orders = (req, res, next) => {
    const status = req.body.order_status;
    
    Admin.getAllOrders(status).then(result => {
        res.status(200).json({result: result});
    })
    .catch(err => {
        next(err);
    })
}

exports.drivers = (req, res, next) => {
    Admin.getAllDrivers().then(result => {
        res.status(200).json({result: result});
    })
    .catch(err => {
        next(err);
    })
}

exports.assignDriver = (req, res, next) => {

    if (!req.body.orderId || !req.body.driverId) {
        const err = new Error('Invalid order id');
        err.statusCode = 401;
        throw err;
    }

    Admin.assignDrivers(req.body.orderId, req.body.driverId).then(result => {
        res.status(200).json({result: 'updated'});
    })
    .catch(err => {
        next(err);
    })
}