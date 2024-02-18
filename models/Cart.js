const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema ({
    qty: {
        type: Number,
        require: true
    },
    game: [{
        type: ObjectId,
        ref: 'Game'
    }] 
});

module.exports = mongoose.model('Cart', cartSchema);