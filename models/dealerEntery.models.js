const mongoose = require('mongoose');

const dealerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
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
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('dealer', dealerSchema);                