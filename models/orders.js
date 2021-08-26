const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const Customer = require("./customers");
const Item = require("./items");

class Order {
    constructor(customerId, id) {
        this.customerId = customerId;
        this.cart = [];
        this.deliveryId = null;
        this.order_stage = "Task Created";
        this.pickups = [];
        this._id = id;
    }

    save() {
        const db = getDb();

        return db.collection('orders').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            err.statusCode = 900;
            throw err;
        });
    }

    addCart() {
        const db = getDb();

        return Customer.findById(this.customerId).then(async result => {
            this.cart = new Customer(result.name, result.mobile, result.password, result.cart, result.id).getCart();
            this.pickups = await this.assignPickups(this.pickups, this.cart);

            // this.assignPickups(this.pickups, this.cart).then(pickup => {
            //     // console.log(this);
                
            //     this.pickups = pickup;
            //     // return pickup;
            //     // console.log(this.cart, this.pickups);
            //     // db.collection('customers').updateOne({_id: new ObjectId(this.customerId)}, {$set: {cart: []}});
            // })
            
        }).catch(err => {
            err.statusCode = 900;
            throw err;
        })
    }

    async assignPickups(pickups, cart) {
        
        pickups = await Promise.all(cart.map(async cItem => {
            const item = await Item.findById(cItem.itemId);
            var location = item.addresses[Math.floor(Math.random() * item.addresses.length)];
            return location;
        }));
        // console.log(pickups);
        return pickups;
    }

    updateOrderStage(newStage) {
        const db = getDb();
        return db.collection('orders').updateOne({_id: this._id}, {$set: {order_stage: newStage}});
    }

    static findById(orderId) {
        const db = getDb();

        return db.collection('orders').findOne({_id: new ObjectId(orderId)})
        .then(order => {
            return order;
        }).catch(err => {
            err.statusCode = 900;
            throw err;
        })
    }
}

module.exports = Order;