const product = require('../models/product.models');

exports.createNewProduct = async (req, res) => {
    try {
        let { productName, unitOfMeasurement, productFor, mainCategory, subCategory, make, specifiaction, Desacription, HSNcode, taxdetails, Warrentry } = req.body;

        let checkProductdata = await product.findOne({ productName: req.body.productName })

        if (checkProductdata) {
            return res.status(401).json({ status: 401, message: "Product already exists" })
        }
        checkProductdata = await product.create({
            productName,
            unitOfMeasurement,
            productFor,
            mainCategory,
            subCategory,
            make,
            specifiaction,
            Desacription,
            HSNcode,
            taxdetails,
            Warrentry
        });

        return res.status(201).json({ status: 201, message: "Product created successfully", product: checkProductdata })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllProductData = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedProduct;

        paginatedProduct = await product.find();

        let count = paginatedProduct.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "Product Data Not Found" })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedProduct = paginatedProduct.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalproduct: count, message: "All Product Found SuccessFully", products: paginatedProduct })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let checkProduct = await product.findById(id);

        if (!checkProduct) {
            return res.status(404).json({ status: 404, message: "Product Not Found." })
        }

        return res.status(200).json({ status: 200, message: "Product Found SuccessFully", product: checkProduct });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};


exports.updateProductData = async (req, res) => {
    try {
        let id = req.params.id;

        let updateProduct = await product.findById(id);

        if (!updateProduct) {
            return res.status(404).json({ status: 404, message: "Product Not Found." })
        }

        updateProduct = await product.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Product Updated SuccessFully", product: updateProduct });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteProductData = async (req, res) => {
    try {
        let id = req.params.id;

        let deleteProduct = await product.findById(id);

        if (!deleteProduct) {
            return res.status(404).json({ status: 404, message: "Product Not Found." })
        }

        await product.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Product Deleted SuccessFully" });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}