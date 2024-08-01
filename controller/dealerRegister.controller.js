const dealerRegitser = require('../models/dealerRegister.models');
const roles = require('../models/role.models');
const bcrypt = require('bcrypt')

exports.createDealerRegister = async (req, res) => {
    try {
        let { name, email, password, address, city, state, contactNo, country, image, marketingType, role } = req.body;

        let checkDealerRegister = await dealerRegitser.findOne({ email: req.body.email })

        if (checkDealerRegister) {
            return res.status(401).json({ status: 401, message: "DealerRegitser already exists" })
        }

        if (!req.file) {
            return res.status(401).json({ status: 401, message: "Image file Is required" })
        }

        let checkRole = await roles.findOne({ roleName: req.body.role })

        if (!checkRole) {
            return res.status(404).json({ status: 404, message: "Role not found" });
        }

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);

        checkDealerRegister = await dealerRegitser.create({
            name,
            email,
            password: hashPassword,
            address,
            city,
            state,
            contactNo,
            country,
            image: req.file.path,
            marketingType,
            role
        });

        return res.status(201).json({ status: 201, message: "DealerRegitser created successfully", dealerRegister: checkDealerRegister })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllDealersRegister = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedDealerRegister;

        paginatedDealerRegister = await dealerRegitser.find();

        let count = paginatedDealerRegister.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "Dealer Register Not Found  " })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedDealerRegister = paginatedDealerRegister.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalDealersRegister: count, message: "All Dealer Register Found SuccessFully", dealerRegister: paginatedDealerRegister })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getDealerRegisterById = async (req, res) => {
    try {
        let id = req.params.id

        let getdealerRegister = await dealerRegitser.findById(id);

        if (!getdealerRegister) {
            return res.status(404).json({ status: 404, message: "Dealer Register Not Found " })
        }

        return res.status(200).json({ status: 200, message: "Dealer Register Found SuccessFully...", dealerRegister: getdealerRegister });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateDealerRegister = async (req, res) => {
    try {
        let id = req.params.id

        let updatedealerRegister = await dealerRegitser.findById(id);

        if (!updatedealerRegister) {
            return res.status(404).json({ status: 404, message: "Dealer Register Not Found " })
        }

        if (req.file) {
            req.body.image = req.file.path
        }

        updatedealerRegister = await dealerRegitser.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Dealer Register Updated SuccessFully...", dealerRegister: updatedealerRegister });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteDealerRegister = async (req, res) => {
    try {
        let id = req.params.id

        let deleteDealerRegister = await dealerRegitser.findById(id);

        if (!deleteDealerRegister) {
            return res.status(404).json({ status: 404, message: "Dealer Register Not Found" })
        }

        await dealerRegitser.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Dealer Register Deleted SuccessFully..." });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
