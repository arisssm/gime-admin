const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const gameSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    },
    trailer: {
        type: String,
        require: true
    },
    isRecommendation:{
        type: Boolean,
        default: false
    },
    isOnSale:{
        type: Boolean,
        default: false
    },
    isFreeGame:{
        type: Boolean,
        default: false
    },
    isSpecialOffer:{
        type: Boolean,
        default: false
    },
    specificationId: [{
        type: ObjectId,
        ref: 'Specification'
    }]
});

module.exports = mongoose.model('Game', gameSchema);