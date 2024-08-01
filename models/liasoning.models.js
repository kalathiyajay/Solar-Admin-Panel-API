const mongoose = require('mongoose');

const liasoningSchema = mongoose.Schema({
    fillNo: {
        type: String,
        require: true
    },
    liasoningType: {
        type: String,
        require: true
    },
    date: {
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
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dealer",
        require: true
    },
    dealerpolicy: {
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
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Liasoning', liasoningSchema); 