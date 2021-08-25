const Driver = require("../models/drivers")

exports.statusUpdate = (req, res, next) => {
    Driver.findById(req.body.driverId).then(driver => {
        new Driver(driver.name, driver.mobile, driver.password, driver._id).statusUpdate(req.body.orderId, req.body.updatedStatus);

        res.status(200).json({status: 'successful'})
    })
    .catch(err => {
        next(err);
    })
}