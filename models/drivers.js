const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const Order = require("./orders");

class Driver {
    
    constructor(name, mobile, password, id) {
        this.name = name;
        this.mobile = mobile;
        this.password = password;
        this._id = id;
    }

    save() {
        
        const db = getDb();

        return db.collection('drivers').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    statusUpdate(orderId, updatedStatus) {
        return Order.findById(orderId)
        .then(order => {
            if (!order) {
                const err = new Error('Cannot find Order');
                err.statusCode = 401;
                throw err;
            }

            order.updateOrderStage(updatedStatus);

        })
        .catch(err => {
            throw err;
        })
        
        
    }

    static findById(driverId) {
        const db = getDb();

        return db.collection('drivers').findOne({_id: new ObjectId(driverId)})
        .then(driver => {
            return driver;
        }).catch(err => {
            console.log("Error: " + err);
            throw err;
        })
    }

    static findByMobile(driverMobile) {
        const db = getDb();

        return db.collection('drivers').findOne({mobile: driverMobile.toString()})
        .then(driver => {
            return driver;
        }).catch(err => {
            console.log("Error: " + err);
            throw err;
        })
    }
}

module.exports = Driver;