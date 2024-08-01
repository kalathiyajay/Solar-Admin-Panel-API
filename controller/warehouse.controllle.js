const wareHouse = require('../models/warehouse.model');

async function generateWareHouseCode() {
    const prefix = 'WH-';

    const lastwareHouse = await wareHouse.findOne().sort({ createdAt: -1 });

    if (!lastwareHouse) {
        return `${prefix}001`;
    }

    const lastwareHouseCode = lastwareHouse.wareHouseCode;

    if (!lastwareHouseCode.startsWith(prefix)) {
        throw new Error('Unexpected wareHouseCode format');
    }

    const lastSequenceNumber = parseInt(lastwareHouseCode.substr(prefix.length), 10);

    let newSequenceNumber;
    if (lastSequenceNumber < 9) {
        newSequenceNumber = lastSequenceNumber + 1;
    } else {
        throw new Error('Sequence number limit reached');
    }

    return `${prefix}${newSequenceNumber.toString().padStart(3, '0')}`;
}

exports.createWareHouse = async (req, res) => {
    try {
        let { wareHouseCode, wareHouseName, contactPeosonName, contactNumber, email, address, pincode, state, district, country } = req.body;

        let chekcWarhouse = await wareHouse.findOne({ wareHouseName: req.body.wareHouseName })

        if (chekcWarhouse) {
            return res.status(401).json({ status: 401, message: "Warehouse already exists" }) 
        }

        if (!wareHouseCode) {
            wareHouseCode = await generateWareHouseCode();
        }
        chekcWarhouse = await wareHouse.create({
            wareHouseCode,
            wareHouseName,
            contactPeosonName,
            contactNumber,
            email,
            address,
            pincode,
            state,
            district,
            country
        });

        return res.status(201).json({ status: 201, message: "Warehouse created successfully", wareHouse: chekcWarhouse })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllWareHouse = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedWareHouse;

        paginatedWareHouse = await wareHouse.find();

        let count = paginatedWareHouse.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No Warhouse Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedWareHouse = paginatedWareHouse.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalWareHouse: count, message: 'All WareHouse Found Successfully..', wareHouse: paginatedWareHouse })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getWareHouseById = async (req, res) => {
    try {
        let id = req.params.id;

        let wareHouseById = await wareHouse.findById(id);

        if (!wareHouseById) {
            return res.status(404).json({ status: 404, message: "WareHouse Not Found" })
        }

        return res.status(200).json({ status: 200, message: "WareHouse Found Successfully..", wareHouse: wareHouseById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.updateWareHouseById = async (req, res) => {
    try {
        let id = req.params.id;

        let wareHouseById = await wareHouse.findById(id);

        if (!wareHouseById) {
            return res.status(404).json({ status: 404, message: "WareHouse Not Found" })
        }

        wareHouseById = await wareHouse.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "WareHouse Updated Successfully..", wareHouse: wareHouseById });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteWareHouseById = async (req, res) => {
    try {
        let id = req.params.id;

        let wareHouseById = await wareHouse.findById(id);

        if (!wareHouseById) {
            return res.status(404).json({ status: 404, message: "WareHouse Not Found" })
        }

        await wareHouse.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "WareHouse Deleted Successfully.." });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}