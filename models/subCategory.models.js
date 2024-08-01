const mongoose = require('mongoose');

const subCategoryesSchema = mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true
    },
    subCategoryName: {
        type: String,
        require: true
    },  
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('subCategory', subCategoryesSchema);