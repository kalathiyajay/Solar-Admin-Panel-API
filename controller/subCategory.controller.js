const subCategory = require('../models/subCategory.models');

exports.createSubCategory = async (req, res) => {
    try {
        let { categoryName, subCategoryName } = req.body;

        let checkCategory = await subCategory.findOne({ subCategoryName: subCategoryName })

        if (checkCategory) {
             return res.status(401).json({ status: 401, message: "subCategory Name Is Already Exiest.." })
        }

        checkCategory = await subCategory.create({
            categoryName,
            subCategoryName
        });

        return res.status(201).json({ status: 201, message: "subCategory Is Created successFully..", category: checkCategory })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllSubCategory = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" });
        }

        let paginatedSubCategory;

        paginatedSubCategory = await subCategory.find();

        let count = paginatedSubCategory.length;

        if (count === 0) {
             return res.status(404).json({ status: 404, message: "subCategory Not Found" })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedSubCategory = paginatedSubCategory.slice(startIndex, lastIndex);
        }

        return res.status(200).json({ status: 200, TotalSubCategory: count, message: 'All subCategory Found Successfully..', subCategory: paginatedSubCategory })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getSubCategoryById = async (req, res) => {
    try {
        let id = req.params.id;
        
        let subCategoryById = await subCategory.findById(id);

        if (!subCategoryById) {
             return res.status(404).json({ status: 404, message: "subCategory Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get subCategory Data Successfully...", subCategory: subCategoryById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateSubCategory = async (req, res) => {
    try {
        let id = req.params.id;

        let checkSubCategoryId = await subCategory.findById(id);

        if (!checkSubCategoryId) {
             return res.status(404).json({ status: 404, message: "subCategory Not Found" })
        }

        checkSubCategoryId = await subCategory.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "subCategory Updated Successfully..", category: checkSubCategoryId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {
        let id = req.params.id;

        let checkSubCategoryId = await subCategory.findById(id);

        if (!checkSubCategoryId) {
             return res.status(404).json({ status: 404, message: "subCategory Not Found" });
        }

        await subCategory.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "subCategory Removed Successfully.." });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
}
