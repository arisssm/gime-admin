const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const PaymentMethod = require('./PaymentMethod');
const User = require('./User');
const Cart = require('./Cart');

const billingSchema = new mongoose.Schema ({
    qrCode: {
        type: String,
        require: true
    },
    paymentStatus:  {
        type: String,
        enum: ['paid','unpaid'],   
        default: 'unpaid'
    },
    userId: {
        type: ObjectId,
        ref: User
    },
    cartId: {
        type: ObjectId,
        ref: Cart
    },
});

module.exports = mongoose.model('Billing', billingSchema);