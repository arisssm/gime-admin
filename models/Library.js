const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const User = require('./User');
const Game = require('./Game');

const librarySchema = new mongoose.Schema ({
    userId:{
        type: ObjectId,
        ref: User
    },
    gameId: {
        type: ObjectId,
        ref: Game
    } 
});

module.exports = mongoose.model('Library', librarySchema);