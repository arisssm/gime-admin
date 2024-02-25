const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Payment = require('./PaymentMethod');
const User = require('./User');
const Game = require('./Game');
// const Cart = require('./Cart');

const billingSchema = new mongoose.Schema ({
    gameId: {
        type: ObjectId,
        ref: Game
    },
    userId: {
        type: ObjectId,
        ref: User
    },
    paymentId:{
        type: ObjectId,
        ref: Payment
    },
    status: {
        type: String,
        enum: ['paid','unpaid']
    },
});

module.exports = mongoose.model('Billing', billingSchema);