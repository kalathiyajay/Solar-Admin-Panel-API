const mongoose = require('mongoose');

const kitProductSchema = mongoose.Schema({
    kitName: {
        type: String,
        require: true
    },
    product: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('KitProduct', kitProductSchema);