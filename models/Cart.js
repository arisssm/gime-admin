const mongoose = require('mongoose');
const Game = require('./Game');
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema ({
    gameId: {
        type: ObjectId,
        ref: Game
    }
});

module.exports = mongoose.model('Cart', cartSchema);