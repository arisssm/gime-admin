const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema ({
    title : {
        type: String,
        require: true
    },
    publishDate : {
        type: Date,
        require: true
    },
    content : {
        type: String,
        require: true
    },
    image : {
        type: String,
        require: true
    },
    isPopular : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('News', newsSchema);