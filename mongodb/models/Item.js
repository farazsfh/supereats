const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    weight: {
        type: String,
        required: false
    },
    form: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Item', ItemSchema);