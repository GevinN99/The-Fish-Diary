const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    images: [{type: String}],
    videos: [{type: String}],
    stock: {type: String, enum: ['available', 'not available'], default: 'available'},
    price: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Medic', MedicSchema);
