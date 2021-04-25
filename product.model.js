const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    picture: {type: String, required: true},
    price: {type: Number, required: true}
},
{timestamps: true, virtuals: true});

module.exports = model('Product', ProductSchema);