// const commercialMarket = require('../models/commercialMarketing.models');
// const { v4: uuidv4 } = require('uuid');

// async function generateFillNo() {
//     const lastCommercialMarket = await commercialMarket.findOne().sort({ createdAt: -1 });
//     if (!lastCommercialMarket) {
//         return 'A001';
//     }

//     const lastFillNo = lastCommercialMarket.fillNo;
//     const prefix = lastFillNo.charAt(0);

//     let sequenceNumber = parseInt(lastFillNo.substr(1));
//     if (sequenceNumber < 5) {
//         sequenceNumber++;
//     } else {
//         const nextPrefix = String.fromCharCode(prefix.charCodeAt(0) + 1);
//         sequenceNumber = 1;
//         return `${nextPrefix}001`;
//     }

//     return `${prefix}${sequenceNumber.toString().padStart(3, '0')}`;
// }

// async function generateFillNo() {
//     // Find the last record and sort by 'fillNo' in descending order
//     const lastCommercialMarket = await commercialMarket.findOne().sort({ fillNo: -1 });

//     // If no record exists, start with 'A001'
//     if (!lastCommercialMarket) {
//         return 'A001';
//     }

//     const lastFillNo = lastCommercialMarket.fillNo;
//     const prefix = lastFillNo.charAt(0);
//     let sequenceNumber = parseInt(lastFillNo.substr(1));

//     // Increment sequence number
//     sequenceNumber++;

//     // Check if sequenceNumber has exceeded 999
//     if (sequenceNumber > 999) {
//         const nextPrefix = String.fromCharCode(prefix.charCodeAt(0) + 1);
//         sequenceNumber = 1;
//         return `${nextPrefix}001`;
//     }

//     // Return the new fillNo with zero-padding
//     return `${prefix}${sequenceNumber.toString().padStart(3, '0')}`;
// }
const commercialMarket = require('../models/commercialMarketing.models');
const FillNoTracker = require('../models/fillNoTrackerModels');

async function generateFillNo() {
    let tracker = await FillNoTracker.findOne();

    if (!tracker) {
        tracker = new FillNoTracker({ prefix: 'A', lastSequenceNumber: 0 });
        await tracker.save();
    }

    let nextFillNo;
    let sequenceNumber = tracker.lastSequenceNumber + 1;

    if (sequenceNumber > 4) {
        const newPrefix = String.fromCharCode(tracker.prefix.charCodeAt(0) + 1);

        let newPrefixTracker = await FillNoTracker.findOne({ prefix: newPrefix });
        if (!newPrefixTracker) {
            newPrefixTracker = new FillNoTracker({ prefix: newPrefix, lastSequenceNumber: 0 });
            await newPrefixTracker.save();
        }

        tracker.prefix = newPrefix;

        tracker.lastSequenceNumber = 1; 

        await tracker.save();

        nextFillNo = `${newPrefix}${tracker.lastSequenceNumber.toString().padStart(3, '0')}`;

    } else {
        nextFillNo = `${tracker.prefix}${sequenceNumber.toString().padStart(3, '0')}`;
        tracker.lastSequenceNumber = sequenceNumber;
        await tracker.save();
    }
  
    return nextFillNo;
}

exports.createcommercialMarket = async (req, res) => {
    try {
        let { type } = req.body;

        if (type === "commercialMarketing") {

            let { fillNo, date, contactPeosonName, dealer, phoneNumber, address, city, district, pincode, latitude, amount, gst, totalAmount, bank, consumerNameAsPerLightBill, dealerCommission, consumerNumber, conectionLoad, tarrif, averageMonthlyBill, gstNumber, panNumber, udhyamRegistration,phase } = req.body;

            let checkcommercialMarket = await commercialMarket.findOne({ phoneNumber: req.body.phoneNumber })

            if (checkcommercialMarket) {
                return res.status(401).json({ status: 401, message: "CommercialMarket Is Already Exiest.." })
            }

            if (!fillNo) {
                fillNo = await generateFillNo();
            }

            checkcommercialMarket = await commercialMarket.create({
                fillNo,
                date,
                contactPeosonName,
                phoneNumber,
                address,
                city,
                dealer,
                district,
                pincode,
                latitude,
                amount,
                gst,
                totalAmount,
                bank,
                consumerNameAsPerLightBill,
                dealerCommission,
                consumerNumber,
                conectionLoad,
                tarrif,
                averageMonthlyBill,
                gstNumber,
                panNumber,
                udhyamRegistration,
                phase,
                type: "commercialMarketing"
            });

            return res.status(201).json({ status: 201, message: "CommercialMarket Is Created successFully..", commercialMarketing: checkcommercialMarket })
        }

        if (type === "residentialMarketing") {

            let { fillNo, date, consumerName, phoneNumber, consumerNumber, address, city, district, pincode, latitude, longitude, marketingType, primaryAccount, dealer, cashAmount, solarAmount, solarModuleMake, dealerPolicy, solarModulWp, solarModuleNos, systmSizeKw, inventrySize } = req.body;

            let checkResidentMarket = await commercialMarket.findOne({ phoneNumber: req.body.phoneNumber })
            if (checkResidentMarket) {
                return res.status(401).json({ status: 401, message: "residentialMarketing Is Already Exiest.." })
            }

            if (!fillNo) {
                fillNo = await generateFillNo();
            }

            checkResidentMarket = await commercialMarket.create({
                fillNo,
                date,
                consumerName,
                phoneNumber,
                consumerNumber,
                address,
                city,
                district,
                pincode,
                latitude,
                longitude,
                marketingType,
                primaryAccount,
                dealer,
                cashAmount,
                solarAmount,
                solarModuleMake,
                dealerPolicy,
                solarModulWp,
                solarModuleNos,
                systmSizeKw,
                inventrySize,
                type: "residentialMarketing"
            });

            return res.status(201).json({ status: 201, message: "residentialMarketing Is Created successFully..", residentialMarketing: checkResidentMarket })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllCommercialmarket = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedRCommercialMarket;

        paginatedRCommercialMarket = await commercialMarket.find();

        let count = paginatedRCommercialMarket.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No CommercialMarket Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedRCommercialMarket = paginatedRCommercialMarket.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalCommercialMarket: count, message: 'All CommercialMarket Found Successfully..', commercialMarket: paginatedRCommercialMarket })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getCommercialMarketById = async (req, res) => {
    try {
        let id = req.params.id;

        let commercialMarketById = await commercialMarket.findById(id);

        if (!commercialMarketById) {
            return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get CommercialMarket Data Successfully...", CommercialMarket: commercialMarketById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateCommercialMarket = async (req, res) => {
    try {
        let id = req.params.id;

        let checkCommercialMarketId = await commercialMarket.findById(id);

        if (!checkCommercialMarketId) {
            return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
        }

        checkCommercialMarketId = await commercialMarket.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "CommercialMarket Updated Successfully..", CommercialMarket: checkCommercialMarketId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteCommercialMasrket = async (req, res) => {
    try {
        let id = req.params.id;

        let checkCommercialMarketId = await commercialMarket.findById(id);

        if (!checkCommercialMarketId) {
            return res.status(404).json({ status: 404, message: "CommercialMarket Not Found" })
        }

        await commercialMarket.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "CommercialMarket Removed Successfully.." })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
