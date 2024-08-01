const account = require('../models/account.models');

exports.createAccount = async (req, res) => {
    try {
        let { fillNo, name, Kw, address, dealer, solarAmount, differenceAmount, pendingAmount, bank, date, details, pay1, pay2, rec1, rec2, fabricator, fabricatorAmount, fabricatorDate, electrician, electricianAmount, electricianDate, remark } = req.body;

        let checkAccount = await account.findOne({ name: req.body.name })

        if (checkAccount) {
            return res.status(401).json({ status: 401, message: "Account Is Already Exiest.." })
        }

        checkAccount = await account.create({
            fillNo,
            name,
            Kw,
            address,
            dealer,
            solarAmount,
            differenceAmount,
            pendingAmount,
            bank,
            date,
            details,
            pay1,
            pay2,
            rec1,
            rec2,
            fabricator,
            fabricatorAmount,
            fabricatorDate,
            electrician,
            electricianAmount,
            electricianDate,
            remark
        });

        return res.status(201).json({ status: 201, message: "Account Is Created successFully..", account: checkAccount });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllAccount = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedAccount;

        paginatedAccount = await account.find();

        let count = paginatedAccount.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No Account Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedAccount = paginatedAccount.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalAccount: count, message: 'All Account Found Successfully..', accounts: paginatedAccount })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getAccountById = async (req, res) => {
    try {
        let id = req.params.id;

        let accountById = await account.findById(id);

        if (!accountById) {
            return res.status(404).json({ status: 404, message: "Account Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get Account Data Successfully...", credit: accountById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateAccount = async (req, res) => {
    try {
        let id = req.params.id;

        let checkAccountId = await account.findById(id);

        if (!checkAccountId) {
            return res.status(404).json({ status: 404, message: "Account Not Found" })
        }

        checkAccountId = await account.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Account Updated Successfully..", account: checkAccountId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        let id = req.params.id;

        let checkAccountId = await account.findById(id);

        if (!checkAccountId) {
            return res.status(404).json({ status: 404, message: "Account Not Found" })
        }

        await account.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Account Removed Successfully.." });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
