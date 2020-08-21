const mongoose = require('mongoose');
const Item = require('./Item').schema;

const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    items: {
        type: [Item.schema],
        required: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);