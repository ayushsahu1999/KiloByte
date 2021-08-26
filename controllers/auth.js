const Driver = require('../models/drivers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customers');
const Admin = require('../models/admin');

exports.signup = (req, res, next) => {

    const name = req.body.name;
    const password = req.body.password;
    const mobile = req.body.mobile;

    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const customer = new Customer(name, mobile, hashedPw);
        customer.save().then(result => {
            console.log('customer Created!');
            res.status(200).json({status: 'Done!'});
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.login = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    Customer.findByMobile(mobile)
    .then(customer => {
        if (!customer) {
            const err = new Error('Cannot find this id');
            err.statusCode = 404;
            throw err;
        }

        bcrypt.compare(password, customer.password)
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Username or password incorrect');
                error.statusCode = 900;
                throw error;
            }

            const token = jwt.sign({
                userType: 'customer',
                mobile: customer.mobile
            }, 'somesupersecretsecret', {
                expiresIn: '10d'
            });
        
            res.status(200).json({token: token});
        })

    })
    .catch(err => {
        next(err);
    })
    
}

exports.driverSignup = (req, res, next) => {

    const name = req.body.name;
    const password = req.body.password;
    const mobile = req.body.mobile;

    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const driver = new Driver(name, mobile, hashedPw);
        driver.save().then(result => {
            console.log('Driver Created!');
            res.status(200).json({status: 'Done!'});
        })
    })
    .catch(err => {
        next(err);
    });
    
}

exports.driverLogin = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    Driver.findByMobile(mobile)
    .then(driver => {
        if (!driver) {
            const err = new Error('Cannot find this id');
            err.statusCode = 404;
            throw err;
        }

        bcrypt.compare(password, driver.password)
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Username or password incorrect');
                error.statusCode = 900;
                throw error;
            }

            const token = jwt.sign({
                userType: 'driver',
                mobile: driver.mobile
            }, 'somesupersecretsecret', {
                expiresIn: '10d'
            });
        
            res.status(200).json({token: token});
        })

    })
    .catch(err => {
        next(err);
    })
    
}

exports.adminSignup = (req, res, next) => {

    const name = req.body.name;
    const password = req.body.password;
    const mobile = req.body.mobile;

    bcrypt.hash(password, 12)
    .then(hashedPw => {
        const admin = new Admin(name, mobile, hashedPw);
        admin.save().then(result => {
            console.log('admin Created!');
            res.status(200).json({status: 'Done!'});
        })
    })
    .catch(err => {
        next(err);
    });
    
}

exports.adminLogin = (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    Admin.findByMobile(mobile)
    .then(admin => {
        if (!admin) {
            const err = new Error('Cannot find this id');
            err.statusCode = 404;
            throw err;
        }

        bcrypt.compare(password, admin.password)
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Username or password incorrect');
                error.statusCode = 900;
                throw error;
            }

            const token = jwt.sign({
                userType: 'admin',
                mobile: admin.mobile
            }, 'somesupersecretsecret', {
                expiresIn: '10d'
            });
        
            res.status(200).json({token: token});
        })

    })
    .catch(err => {
        next(err);
    })
    
}