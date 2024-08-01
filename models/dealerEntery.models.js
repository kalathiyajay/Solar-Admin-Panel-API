const mongoose = require('mongoose');

const dealerSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dealerRegister",
        required: true
    },
    location: {
        type: String,
        require: true
    },
    adharCard: {
        type: Array,
        require: true
    },
    lightBill: {
        type: Array,
        require: true
    },
    veraBill: {
        type: Array,
        require: true
    },
    contactNo: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('dealer', dealerSchema);                