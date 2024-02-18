const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const billing = require('./Billing');

const paymentMethodSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: true
    },
    paymentSteps: {
        type: String,
        require: true
    },
    billingId: {
        type: ObjectId,
        ref: billing
    }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);