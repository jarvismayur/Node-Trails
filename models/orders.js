const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }, // Reference to Payment model
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
