const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    },
    amountSold: {
        type: Number,
        required: false,
        default: 0
    },
    price: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);