const mongoose = require('mongoose');

const fillNoTrackerSchema = new mongoose.Schema({
    prefix: { type: String, required: true },
    lastSequenceNumber: { type: Number, default: 0 }
});

module.exports = mongoose.model('FillNoTracker', fillNoTrackerSchema);


// const commercialMarket = require('../models/commercialMarketing.models');
// const FillNoTracker = require('../models/fillNoTrackerModels');

// async function generateFillNo() {
//     let tracker = await FillNoTracker.findOne({ prefix: 'A' });

//     if (!tracker) {
//         tracker = new FillNoTracker({ prefix: 'A', lastSequenceNumber: 0 });
//         await tracker.save();
//     }

//     let nextFillNo;
//     let sequenceNumber = tracker.lastSequenceNumber + 1;

//     if (sequenceNumber > 9) {
//         const newPrefix = String.fromCharCode(tracker.prefix.charCodeAt(0) + 1);
//         sequenceNumber = 1;
//         tracker.prefix = newPrefix;
//         await tracker.save();
//         nextFillNo = `${newPrefix}${sequenceNumber.toString().padStart(3, '0')}`;
//     } else {
//         nextFillNo = `${tracker.prefix}${sequenceNumber.toString().padStart(3, '0')}`;
//         tracker.lastSequenceNumber = sequenceNumber;
//         await tracker.save();
//     }

//     return nextFillNo;
// }