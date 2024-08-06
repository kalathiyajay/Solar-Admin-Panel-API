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

    // Residential Market Models

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
    },

    // Lisoning Models
    liasoningType: {
        type: String,
        require: true
    },
    applicationStatus: {
        type: String,
        require: true
    },
    feasibilityStatus: {
        type: String,
        require: true
    },
    fQGenrete: {
        type: String,
        require: true
    },
    fqPaymentMode: {
        type: String,
        require: true
    },
    fqPaid: {
        type: String,
        require: true
    },
    fqPermission: {
        type: String,
        require: true
    },
    stamp: {
        type: String,
        require: true
    },
    netMeterDocumennt: {
        type: String,
        require: true
    },
    meterInstall: {
        type: String,
        require: true
    },
    subcidyclaimed: {
        type: String,
        require: true
    },
    subcidyRecieved: {
        type: String,
        require: true
    },
    liasoningQuery: {
        type: String,
        require: true
    },

    // Other Fields

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
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Completed"
    }

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('commercialMarketing', commercialMarketingSchema); 