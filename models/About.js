const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema ({
    corporateName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('About', aboutSchema);