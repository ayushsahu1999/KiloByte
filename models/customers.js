const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Customer {
    
    constructor(name, mobile, password, cart) {
        // this._id = id;
        this.name = name;
        this.mobile = mobile;
        this.password = password;
        this.cart = cart;
    }

    save() {
        
        const db = getDb();

        return db.collection('customers').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    static findById(customerId) {
        const db = getDb();

        // console.log(customerMobile);
        return db.collection('customers').findOne({_id: new ObjectId(customerId)})
        .then(customer => {
            // console.log(customer);
            // console.log("customer: " + customer);
            return customer;
        }).catch(err => {
            console.log("Error: " + err);
        })
    }

    static findByMobile(customerMobile) {
        const db = getDb();

        // console.log(customerMobile);
        return db.collection('customers').findOne({mobile: customerMobile.toString()})
        .then(customer => {
            // console.log(customer);
            // console.log("customer: " + customer);
            return customer;
        }).catch(err => {
            console.log("Error: " + err);
        })
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id.toString() === product._id.toString()
        // })

        const updatedCart = [{ ...product, quantity: 1}];
        const db = getDb();
        db.collection('customers').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}});
    }

    getCart() {
        return this.cart;
    }
}

module.exports = Customer;