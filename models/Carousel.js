const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema ({
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Carousel', carouselSchema);