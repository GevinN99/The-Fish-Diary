const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    items: [{
        product: {type: Schema.Types.ObjectId, required: true},
        productType: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    total: {type: Number, required: true},
    status: {type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);
