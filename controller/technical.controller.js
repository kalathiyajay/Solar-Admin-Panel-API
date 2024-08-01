const technical = require('../models/technical.models');

exports.createTechnical = async (req, res) => {
    try {
        let { fillNo, name, contact, kw, dealer, pendingPayment, fabiricator, electircoian, solarSize } = req.body;

        let checkTechnical = await technical.findOne({ fillNo: req.body.fillNo })

        if (checkTechnical) {
            return res.status(401).json({ status: 401, message: "Technical Details Is Already Exiest.." })
        }

        checkTechnical = await technical.create({
            fillNo,
            name,
            contact,
            kw,
            dealer,
            pendingPayment,
            fabiricator,
            electircoian,
            solarSize
        });

        return res.status(201).json({ status: 201, message: "Technical Details Is Created successFully..", technical: checkTechnical })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllTechnical = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedTechnical;

        paginatedTechnical = await technical.find();

        let count = paginatedTechnical.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No Technical Details Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedTechnical = paginatedTechnical.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalTechinial: count, message: 'All Technical Details Found Successfully..', category: paginatedTechnical })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getTechnicalById = async (req, res) => {
    try {
        let id = req.params.id;

        let technicalById = await technical.findById(id);

        if (!technicalById) {
            return res.status(404).json({ status: 404, message: "Technical Details Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get Technical Details Successfully...", technical: technicalById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateTechnicalDetails = async (req, res) => {
    try {
        let id = req.params.id;

        let checkTechnicalId = await technical.findById(id);

        if (!checkTechnicalId) {
            return res.status(404).json({ status: 404, message: "Technical details Not Found" })
        }

        checkTechnicalId = await technical.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Technical details Updated Successfully..", technical: checkTechnicalId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteTechnicalDetails = async (req, res) => {
    try {
        let id = req.params.id;

        let checkTechnicalId = await technical.findById(id);

        if (!checkTechnicalId) {
            return res.status(404).json({ status: 404, message: "Technical Details Not Found" })
        }

        await technical.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Technical Details Removed Successfully.." })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
