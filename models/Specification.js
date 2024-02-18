const mongoose = require('mongoose');
const Game = require('./Game');
const { ObjectId } = mongoose.Schema;

const specificationSchema = new mongoose.Schema ({
    os: {
        type: String,
        require: true
    },
    processor: {
        type: String,
        require: true
    },
    memory: {
        type: String,
        require: true
    },
    graphic: {
        type: String,
        require: true
    },
    category:  {
        type: String,
        enum: ['min','req'],   
    },
    gameId: {
        type: ObjectId,
        ref: Game
    }
});

module.exports = mongoose.model('Specification', specificationSchema);