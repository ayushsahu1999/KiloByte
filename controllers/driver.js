const Driver = require("../models/drivers")

exports.statusUpdate = (req, res, next) => {
    if (!req.isAuth || req.userType !== 'driver') {
        const err = new Error('No Access');
        err.statusCode = 404;
        throw err;
    }

    Driver.findByMobile(req.mobile).then(driver => {
        new Driver(driver.name, driver.mobile, driver.password, driver._id).statusUpdate(req.body.orderId, req.body.updatedStatus)
        .then(result => {
            const r = driver.name + " set the order status of " + req.body.orderId + " to " + req.body.updatedStatus;
            res.status(200).json({status: r})
        })

    })
    .catch(err => {
        next(err);
    })
}