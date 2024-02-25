const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: true
    },
    paymentSteps: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);