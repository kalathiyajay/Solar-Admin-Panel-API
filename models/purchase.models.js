const mongoose = require('mongoose');

const purchaseInvoiceSchema = mongoose.Schema({
    poc: {
        type: String,
        require: true
    },
    purchaseDetails: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
        require: true
    },
    wareHouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wareHouse',
        require: true
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Purchase', purchaseInvoiceSchema)