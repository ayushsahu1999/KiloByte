const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const Customer = require("./customers");
const Item = require("./items");

class Order {
    constructor(customerId) {
        this.customerId = customerId;
        this.cart = [];
        this.deliveryId = null;
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
            this.cart = new Customer(result.name, result.mobile, result.password, result.cart, result.id).getCart();

            this.pickups = this.cart.map(async cItem => {
                const item = await Item.findById(cItem.itemId);
                var location = item.addresses[Math.floor(Math.random() * item.addresses.length)];
                return location;
                // .then(item => {
                //     var location = item.addresses[Math.floor(Math.random() * item.addresses.length)];
                //     return location;
                // })
            })
            console.log(this.pickups);
        }).catch(err => {
            err.statusCode = 900;
            throw err;
        })
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