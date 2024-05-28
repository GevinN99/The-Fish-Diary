const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FishSchema = new Schema({
    name: {type: String, required: true},
    species: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    images: [{type: String}],
    videos: [{type: String}],
    stock: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Fish', FishSchema);
