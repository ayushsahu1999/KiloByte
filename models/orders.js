const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const Customer = require("./customers");

class Order {
    constructor(customerId) {
        this.customerId = customerId;
        this.cart = [];
        this.order_stage = "Task Created";
        this.pickups = [];
    }

    save() {
        const db = getDb();

        return db.collection('orders').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    addCart() {
        return Customer.findById(this.customerId).then(result => {
            this.cart = result.getCart();
        }).catch(err => console.log(err))
    }

    assignPickups() {
        // to do
    }

    updateOrderStage(newStage) {
        return db.collection('orders').updateOne({_id: this._id}, {$set: {order_stage: newStage}});
    }

    static findById(orderId) {
        const db = getDb();

        return db.collection('orders').findOne({_id: new ObjectId(orderId)})
        .then(order => {
            return order;
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = Order;