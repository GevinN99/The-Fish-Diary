const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    items: [{
        product: {type: Schema.Types.ObjectId, required: true},
        productType: {type: String, required: true},
        quantity: {type: Number, required: true}
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cart', CartSchema);
