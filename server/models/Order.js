const mongoose = require('mongoose');

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
        type: [{
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
        }],
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);