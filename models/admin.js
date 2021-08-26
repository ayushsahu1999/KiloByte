const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const Item = require("./items");
const Order = require("./orders");

class Admin {
    constructor(name, mobile, password) {
        this.name = name;
        this.mobile = mobile;
        this.password = password;
    }

    save() {
        const db = getDb();

        return db.collection('admin').insertOne(this)
        .catch(err => console.log(err));
    }

    createItems(product) {
        const db = getDb();

        const item = new Item(product.name, product.category, product.addresses || []);
        item.save().then(res => {
            console.log('created');
        })
        .catch(err => {
            err.statusCode = 900;
            throw err;
        })
    }

    static getAllDrivers() {
        const db = getDb();

        return db.collection('drivers').find().toArray()
        .then(drivers => {
            return drivers.map(d => {
                return {
                    _id: d._id,
                    name: d.name,
                    mobile: d.mobile
                }
            });
        })
        .catch(err => {
            err.statusCode = 900;
            throw err;
        })
    }

    static assignDrivers(orderId, driverId) {
        const db = getDb();

        return db.collection('orders').updateOne({_id: new ObjectId(orderId)}, {$set: {deliveryId: driverId}});
    }

    static getAllOrders(orderStage) {
        const db = getDb();

        console.log(orderStage);

        if (orderStage && orderStage !== "") {
            console.log('assassas');
            return db.collection('orders').find({order_stage: orderStage}).toArray()
            .then(orders => {
                return orders;
            })
            .catch(err => {
                err.statusCode = 900;
                throw err;
            })
        } else {
            return db.collection('orders').find().toArray()
            .then(orders => {
                return orders;
            })
            .catch(err => {
                err.statusCode = 900;
                throw err;
            })
        }
        
    }

    static findByMobile(adminMobile) {
        const db = getDb();

        return db.collection('admin').findOne({mobile: adminMobile.toString()})
        .then(admin => {
            return admin;
        }).catch(err => {
            console.log("Error: " + err);
            throw err;
        })
    }
}

module.exports = Admin;