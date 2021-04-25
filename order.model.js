const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    date: Date,
    address: String,
    price: Number,
    products: Object,
    clientName: String,
    clientSurname: String,
    paid: Boolean,
    sent: Boolean,
    email: String,
    city: String,
});

module.exports = mongoose.model('Order', OrderSchema);