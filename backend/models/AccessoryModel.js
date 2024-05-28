const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    images: [{type: String}],
    stock: {type: String, enum: ['available', 'not available'], default: 'available'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Accessory', AccessorySchema);
