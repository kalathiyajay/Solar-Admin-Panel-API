const mongoose = require('mongoose')

const slideBarCategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        require: true
    },
    slideBarImage: {
        type: String,
        require: true

    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('SlideBarCategory', slideBarCategorySchema)