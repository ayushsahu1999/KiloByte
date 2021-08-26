const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Item {
    constructor(name, category, addresses) {
        this.name = name;
        this.category = category;
        this.addresses = addresses;
    }

    save() {
        const db = getDb();
        return db.collection('items').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            err.statusCode = 900;
            throw err;
        });
    }

    static findById(itemId) {
        const db = getDb();

        // console.log(customerMobile);
        return db.collection('items').findOne({_id: new ObjectId(itemId)})
        .then(item => {
            return item;
        }).catch(err => {
            err.statusCode = 900;
            throw err;
        })
    }

}

module.exports = Item;