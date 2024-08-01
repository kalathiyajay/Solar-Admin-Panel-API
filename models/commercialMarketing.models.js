const mongoose = require('mongoose');

const commercialMarketingSchema = mongoose.Schema({
    fillNo: {
        type: String,
        require: true
    },
    contactPeosonName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    latitude: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    gst: {
        type: Number,
        require: true
    },
    totalAmount: {
        type: Number,
        require: true
    },
    bank: {
        type: String,
        require: true
    },
    consumerNameAsPerLightBill: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dealer",
        require: true
    },
    dealerCommission: {
        type: Number,
        require: true
    },
    consumerNumber: {
        type: Number,
        require: true
    },
    conectionLoad: {
        type: Number,
        require: true
    },
    tarrif: {
        type: Number,
        require: true
    },
    averageMonthlyBill: {
        type: Number,
        require: true
    },
    gstNumber: {
        type: Number,
        require: true
    },
    panNumber: {
        type: Number,
        require: true
    },
    udhyamRegistration: {
        type: Number,
        require: true
    },
    fillNo: {
        type: String,
        require: true
    },
    consumerName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    consumerNumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        require: true
    },
    marketingType: {
        type: String,
        require: true
    },
    primaryAccount: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    solarAmount: {
        type: Number,
        require: true
    },
    cashAmount: {
        type: Number,
        require: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dealer",
        require: true
    },
    dealerPolicy: {
        type: String,
        require: true
    },
    solarModuleMake: {
        type: String,
        require: true
    },
    solarModulWp: {
        type: String,
        require: true
    },
    solarModuleNos: {
        type: String,
        require: true
    },
    systmSizeKw: {
        type: String,
        require: true
    },
    inventrySize: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ["commercialMarketing", "residentialMarketing"],
        require: true
    },
    phase: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('commercialMarketing', commercialMarketingSchema); 