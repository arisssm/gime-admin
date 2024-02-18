const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema ({
    featureName: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Feature', featureSchema);