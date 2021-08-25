const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Item {
    constructor(name, category, addresses) {
        // this._id = id;
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
        .catch(err => console.log(err));
    }


}

module.exports = Item;