const mongoose = require('mongoose');
const Order = require('./Order').schema;

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        default: "+15555555555"
    },
    orders: {
        type: [Order],
        required: true
    }
});

module.exports = mongoose.model('Store', StoreSchema);