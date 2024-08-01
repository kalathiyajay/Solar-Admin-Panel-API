const dealer = require('../models/dealerEntery.models');

exports.createDealer = async (req, res) => {
    try {
        let { name, location, adharCard, lightBill, veraBill, contactNo, amount } = req.body;

        let checkDealer = await dealer.findOne({ name: req.body.name })

        if (checkDealer) {
             return res.status(401).json({ status: 401, message: "Dealer Entery already exists" })
        }

        if (!req.files || !req.files['adharCard'] || !req.files['lightBill'] || !req.files['veraBill']) {
             return res.status(401).json({ status: 401, message: "Please upload all required files" });
        }

        checkDealer = await dealer.create({
            name,
            location,
            adharCard: req.files['adharCard'][0].path,
            lightBill: req.files['lightBill'][0].path,
            veraBill: req.files['veraBill'][0].path,
            contactNo,
            amount
        });

        return res.status(201).json({ status: 201, message: "Dealer Entry created successfully", dealerEntery: checkDealer })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllDealers = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedDealer;

        paginatedDealer = await dealer.find();

        let count = paginatedDealer.length;

        if (count === 0) {
             return res.status(401).json({ status: 401, message: "Dealter Entery Not Found  " })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedDealer = paginatedDealer.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalDealersEntery: count, message: "All Dealer Entery Found SuccessFully", dealerEntery: paginatedDealer })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getDealerById = async (req, res) => {
    try {
        let id = req.params.id

        let getdealer = await dealer.findById(id);

        if (!getdealer) {
             return res.status(401).json({ status: 401, message: "Dealer Entery Not Found " })
        }

        return res.status(200).json({ status: 200, message: "Dealer Entery Found SuccessFully...", dealerEnetry: getdealer });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateDealer = async (req, res) => {
    try {
        let id = req.params.id

        let updatedealer = await dealer.findById(id);

        if (!updatedealer) {
             return res.status(401).json({ status: 401, message: "Dealer Entery Not Found " })
        }

        updatedealer = await dealer.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Dealer Entery Updated SuccessFully...", dealer: updatedealer });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteDealer = async (req, res) => {
    try {
        let id = req.params.id

        let deletedealer = await dealer.findById(id);

        if (!deletedealer) {
             return res.status(401).json({ status: 401, message: "Dealer Entery Not Found " })
        }

        await dealer.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Dealer Entery Deleted SuccessFully..." });
        
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
