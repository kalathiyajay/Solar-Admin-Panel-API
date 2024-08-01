const transport = require('../models/transport.models');

exports.createTrasportDetaile = async (req, res) => {
    try {
        let { transportNumber, dateAndTime, vehicalNumber, cost } = req.body;

        let chekTransportData = await transport.findOne({ transportNumber: transportNumber });

        if (chekTransportData) {
            return res.status(401).json({ status: 401, message: "Transport Details Alredy Addedd..." })
        }
        chekTransportData = await transport.create({
            transportNumber,
            dateAndTime,
            vehicalNumber,
            cost
        });

        return res.status(201).json({ status: 201, message: "Transport Details Created SuccessFully....", transport: chekTransportData })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllTransportDetails = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Can't Be less Than 1" })
        }

        let paginatedTarnsportDetails;

        paginatedTarnsportDetails = await transport.find();

        let count = paginatedTarnsportDetails.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No Transport Details Found..." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedTarnsportDetails = paginatedTarnsportDetails.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalTarsportDetals: count, message: "All Transport Details Found SuccessFully....", transport: paginatedTarnsportDetails });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getTransportByID = async (req, res) => {
    try {
        let id = req.params.id

        let getTransportDetails = await transport.findById(id);

        if (!getTransportDetails) {
            return res.status(404).json({ status: 404, message: "Transport Details Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Transport Details Found", trusport: getTransportDetails });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.updateTransportDetails = async (req, res) => {
    try {
        let id = req.params.id

        let updateTransportDetails = await transport.findById(id);

        if (!updateTransportDetails) {
            return res.status(404).json({ status: 404, message: "Transport Details Not Found" })
        }

        updateTransportDetails = await transport.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Transport Details Updated SuccessFully....", transport: updateTransportDetails });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteTransportDetails = async (req, res) => {
    try {
        let id = req.params.id

        let deleteTransportDetails = await transport.findById(id);

        if (!deleteTransportDetails) {
            return res.status(404).json({ status: 404, message: "Transport Details Not Found" })
        }

        await transport.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Transport Details Deleted SuccessFully...." });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}