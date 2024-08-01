const residentialMarketing = require('../models/residential.marketing.models');
const { v4: uuidv4 } = require('uuid');

async function generateFillNo() {
    const lastResidentialMarketing = await residentialMarketing.findOne().sort({ createdAt: -1 });
    if (!lastResidentialMarketing) {
        return 'A001';
    }

    const lastFillNo = lastResidentialMarketing.fillNo;
    const prefix = lastFillNo.charAt(0);

    let sequenceNumber = parseInt(lastFillNo.substr(1));
    if (sequenceNumber < 100) {
        sequenceNumber++;
    } else {
        const nextPrefix = String.fromCharCode(prefix.charCodeAt(0) + 1);
        sequenceNumber = 1;
        return `${nextPrefix}001`;
    }

    return `${prefix}${sequenceNumber.toString().padStart(3, '0')}`;
}

exports.createResidentialMarket = async (req, res) => {
    try {
        let { fillNo, date, consumerName, phoneNumber, consumerNumber, address, city, district, pincode, latitude, longitude, marketingType, primaryAccount, dealer, cashAmount, solarAmount, solarModuleMake, dealerPolicy, solarModulWp, solarModuleNos, systmSizeKw, inventrySize } = req.body;
        
        if (!fillNo) {
            fillNo = await generateFillNo();
        }

        let checkResidentMarket = await residentialMarketing.findOne({ phoneNumber: req.body.phoneNumber })

        if (checkResidentMarket) {
             return res.status(401).json({ status: 401, message: "residentialMarketing Is Already Exiest.." })
        }

        checkResidentMarket = await residentialMarketing.create({
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
            inventrySize
        });

        return res.status(201).json({ status: 201, message: "residentialMarketing Is Created successFully..", residentialMarketing: checkResidentMarket })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllResidentmarket = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedResindentMarket;

        paginatedResindentMarket = await residentialMarketing.find();

        let count = paginatedResindentMarket.length;

        if (count === 0) {
             return res.status(404).json({ status: 404, message: "No liasoning Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedResindentMarket = paginatedResindentMarket.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalResidentMarket: count, message: 'All ResidentMarket Found Successfully..', liasoning: paginatedResindentMarket })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getResidentMarketById = async (req, res) => {
    try {
        let id = req.params.id;

        let residentMarketById = await residentialMarketing.findById(id);

        if (!residentMarketById) {
             return res.status(404).json({ status: 404, message: "ResidentMarket Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get ResidentMarket Data Successfully...", liasoning: residentMarketById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateResidentMasrket = async (req, res) => {
    try {
        let id = req.params.id;

        let checkResidentMarketId = await residentialMarketing.findById(id);

        if (!checkResidentMarketId) {
             return res.status(404).json({ status: 404, message: "ResidentMarket Not Found" })
        }

        checkResidentMarketId = await residentialMarketing.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "ResidentMarket Updated Successfully..", liasoning: checkResidentMarketId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteResidentMasrket = async (req, res) => {
    try {
        let id = req.params.id;

        let checkResidentMarketId = await residentialMarketing.findById(id);

        if (!checkResidentMarketId) {
             return res.status(404).json({ status: 404, message: "ResidentMarket Not Found" })
        }

        await residentialMarketing.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "ResidentMarket Removed Successfully.." })
        
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
