const purchase = require('../models/purchase.models');

exports.createNewPurchase = async (req, res) => {
    try {
        let { poc, purchaseDetails, qty, vendor, wareHouse } = req.body;

        let checkPurchasedata = await purchase.findOne({ poc: req.body.poc })

        if (checkPurchasedata) {
            return res.status(401).json({ status: 401, message: "Purchase already exists" })
        }

        checkPurchasedata = await purchase.create({
            poc,
            purchaseDetails,
            qty,
            vendor,
            wareHouse
        });

        return res.status(201).json({ status: 201, message: "Purchase created successfully", purchase: checkPurchasedata })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllPurchaseData = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedPurchase;

        paginatedPurchase = await purchase.find();

        let count = paginatedPurchase.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "Purchase Data Not Found" })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedPurchase = paginatedPurchase.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalPurchase: count, message: "All Purchase Found SuccessFully", purchase: paginatedPurchase })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getPurchaseById = async (req, res) => {
    try {
        let id = req.params.id;

        let checkPurchase = await purchase.findById(id);

        if (!checkPurchase) {
            return res.status(404).json({ status: 404, message: "Purchase Not Found." })
        }

        return res.status(200).json({ status: 200, message: "Purchase Found SuccessFully...", purchase: checkPurchase });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};


exports.updatePurchaseData = async (req, res) => {
    try {
        let id = req.params.id;

        let updatePurchase = await purchase.findById(id);

        if (!updatePurchase) {
            return res.status(404).json({ status: 404, message: "Purchase Not Found." })
        }

        updatePurchase = await purchase.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Purchase Updated SuccessFully", purchase: updatePurchase });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deletePurchase = async (req, res) => {
    try {
        let id = req.params.id;

        let deletepurchase = await purchase.findById(id);

        if (!deletepurchase) {
            return res.status(404).json({ status: 404, message: "Purchasee Not Found." })
        }

        await purchase.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Purchase Deleted SuccessFully" });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}