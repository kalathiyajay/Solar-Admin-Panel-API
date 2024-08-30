const mongoose = require('mongoose');

const purchaseInvoiceSchema = mongoose.Schema({
    SrNo: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    HSHCode: {
        type: Number,
        require: true
    },
    Qty: {
        type: Number, 
        require: true
    },
    unitPrice: {
        type: Number,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    gst: { 
        type: Number,
        require: true
    },
    gstAmount: {
        type: Number,
        require: true
    },
    taxableAmount: {
        type: Number,
        require: true
    },
    totalGstAmount: {
        type: Number,
        require: true
    },
    amountTotal: {
        type: Number,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Purchase', purchaseInvoiceSchema)