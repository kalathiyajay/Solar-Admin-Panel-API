const kitProduct = require('../models/kitProduct.models');

exports.createKitProduct = async (req, res) => {
    try {
        let { kitName, product, qty } = req.body;

        let chekcKitProduct = await kitProduct.findOne({ kitName: req.body.kitName })

        if (chekcKitProduct) {
            return res.status(401).json({ status: 401, message: "kitProduct already exists" })
        }

        chekcKitProduct = await kitProduct.create({
            kitName,
            product,
            qty
        });

        return res.status(201).json({ status: 201, message: "kitProduct created successfully", kitProduct: chekcKitProduct })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllKitProduct = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedKitProduct

        paginatedKitProduct = await kitProduct.find();

        let count = paginatedKitProduct.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No kitProduct Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedKitProduct = paginatedKitProduct.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalKitProducts: count, message: 'All kitProduct Found Successfully..', kitProduct: paginatedKitProduct })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getkitProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let kitProductById = await kitProduct.findById(id);

        if (!kitProductById) {
            return res.status(404).json({ status: 404, message: "kitProduct Not Found" })
        }

        return res.status(200).json({ status: 200, message: "kitProduct Found Successfully..", kitProduct: kitProductById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.updateKitProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let kitProductById = await kitProduct.findById(id);

        if (!kitProductById) {
            return res.status(404).json({ status: 404, message: "kitProduct Not Found" })
        }

        kitProductById = await kitProduct.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "kitProduct Updated Successfully..", kitProduct: kitProductById });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteKitProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let kitProductById = await kitProduct.findById(id);

        if (!kitProductById) {
            return res.status(404).json({ status: 404, message: "kitProduct Not Found" })
        }

        await kitProduct.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "kitProduct Deleted Successfully.." });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}