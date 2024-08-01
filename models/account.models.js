const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    fillNo: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    Kw: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dealer",
        require: true
    },
    solarAmount: {
        type: Number,
        require: true
    },
    differenceAmount: {
        type: Number,
        require: true
    },
    pendingAmount: {
        type: Number,
        require: true
    },
    bank: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    pay1: {
        type: String,
        require: true
    },
    pay2: {
        type: String,
        require: true
    },
    rec1: {
        type: String,
        require: true
    },
    rec2: {
        type: String,
        require: true
    },
    fabricator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    fabricatorAmount: {
        type: String,
        require: true
    },
    fabricatorDate: {
        type: String,
        require: true
    },
    electrician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    electricianAmount: {
        type: String,
        require: true
    },
    electricianDate: {
        type: String,
        require: true
    },
    remark: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Account', accountSchema); 