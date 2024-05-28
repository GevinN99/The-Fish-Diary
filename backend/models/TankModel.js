const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TankSchema = new Schema({
    name: {type: String, required: true},
    size: {type: String, required: true},
    description: {type: String},
    images: [{type: String}],
    videos: [{type: String}],
    stock: {type: String, enum: ['available', 'not available'], default: 'available'},
    price: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Tank', TankSchema);