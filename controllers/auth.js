const Customer = require('../models/customers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {

    const name = req.body.name;
    const password = req.body.password;
    const mobile = req.body.mobile;

    const hashedPw = await bcrypt.hash(password, 12);
    
    const customer = new Customer(name, mobile, hashedPw, []);
    customer.save().then(result => {
        console.log('Customer Created!');
        res.status(200).json({status: 'Done!'});
    })
    .catch(err => {
        next(err);
    })
}

exports.login = async (req, res, next) => {
    const mobile = req.body.mobile;
    const password = req.body.password;

    console.log(mobile);
    const customer = await Customer.findByMobile(mobile)
    // console.log(cust);

    if (!customer) {
        const err = new Error('Cannot find this id');
        err.statusCode = 404;
        throw err;
    }

    const isEqual = await bcrypt.compare(password, customer.password);
    if (!isEqual) {
        const error = new Error('Username or password incorrect');
        error.statusCode = 900;
        throw error;
    }

    const token = jwt.sign({
        userId: customer._id.toString(),
        name: customer.name
    }, 'somesupersecretsecret', {
        expiresIn: '24h'
    });

    res.status(200).json({token: token});
    
}