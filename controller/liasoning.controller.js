const liasoning = require('../models/liasoning.models');

exports.createLiasoning = async (req, res) => {
    try {
        let { fillNo, liasoningType, date, consumerName, phoneNumber, consumerNumber, address, city, district, pincode, latitude, longitude, applicationStatus, feasibilityStatus, fQGenrete, fqPaymentMode, fqPaid, fqPermission, dealer,dealerpolicy, solarModuleMake, solarModulWp, solarModuleNos, systmSizeKw, inventrySize, stamp, netMeterDocumennt, meterInstall, subcidyclaimed, subcidyRecieved, liasoningQuery } = req.body;
        
        let checkLiasoning = await liasoning.findOne({ fillNo: req.body.fillNo })
        
        if (checkLiasoning) {
             return res.status(401).json({ status: 401, message: "liasoning Is Already Exiest.." })
        }

        checkLiasoning = await liasoning.create({
            fillNo,
            liasoningType,
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
            applicationStatus,
            feasibilityStatus,
            fQGenrete,
            fqPaymentMode,
            fqPaid,
            fqPermission,
            dealer,
            dealerpolicy,
            solarModuleMake,
            solarModulWp,
            solarModuleNos,
            systmSizeKw,
            inventrySize,
            stamp,
            netMeterDocumennt,
            meterInstall,
            subcidyclaimed,
            subcidyRecieved,
            liasoningQuery
        });

        return res.status(201).json({ status: 201, message: "liasoning Is Created successFully..", liasoning: checkLiasoning })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllLiasoning = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedLiasoning;

        paginatedLiasoning = await liasoning.find();

        let count = paginatedLiasoning.length;

        if (count === 0) {
             return res.status(404).json({ status: 404, message: "No liasoning Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedLiasoning = paginatedLiasoning.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, Totallisoning: count, message: 'All liasoning Found Successfully..', liasoning: paginatedLiasoning })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getLiasoningById = async (req, res) => {
    try {
        let id = req.params.id;

        let liasoningById = await liasoning.findById(id);

        if (!liasoningById) {
             return res.status(404).json({ status: 404, message: "liasoning Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get liasoning Data Successfully...", liasoning: liasoningById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateLiasoning = async (req, res) => {
    try {
        let id = req.params.id;

        let checkLiasoningId = await liasoning.findById(id);

        if (!checkLiasoningId) {
             return res.status(404).json({ status: 404, message: "liasoning Not Found" })
        }

        checkLiasoningId = await liasoning.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "liasoning Updated Successfully..", liasoning: checkLiasoningId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteLiasoning = async (req, res) => {
    try {
        let id = req.params.id;

        let checkLiasoningId = await liasoning.findById(id);

        if (!checkLiasoningId) {
             return res.status(404).json({ status: 404, message: "liasoning Not Found" })
        }

        await liasoning.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "liasoning Removed Successfully.." })
        
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
