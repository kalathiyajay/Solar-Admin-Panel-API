const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    unitOfMeasurement: {
        type: Number,
        require: true
    },
    productFor: {
        type: Number,
        require: true
    },
    mainCategory: {
        type: String,
        require: true
    },
    subCategory: {
        type: String,
        require: true
    },
    make: {
        type: Number,
        require: true
    },
    specifiaction: {
        type: Number,
        require: true
    },
    Desacription: {
        type: String,
        require: true
    },
    HSNcode: {
        type: Number,
        require: true
    },
    taxdetails: {
        type: Number,
        require: true
    },
    Warrentry: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('product', productSchema);