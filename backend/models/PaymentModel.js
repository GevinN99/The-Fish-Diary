const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    order: {type: Schema.Types.ObjectId, ref: 'Order', required: true},
    amount: {type: Number, required: true},
    paymentMethod: {type: String, required: true},
    paymentStatus: {type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending'},
    stripePaymentId: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Payment', PaymentSchema);
