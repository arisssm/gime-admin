const mongoose = require('mongoose');
const { ObjectID } = mongoose.Schema;

const librarySchema = new mongoose.Schema ({
    user: [{
        type:ObjectID,
        ref: 'User'
    }],
    cart: [{
        type:ObjectID,
        ref: 'Cart'
    }] 
});

module.exports = mongoose.model('Library', librarySchema);