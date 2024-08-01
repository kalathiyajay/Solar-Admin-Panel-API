const category = require('../models/category.models');

exports.createCategory = async (req, res) => {
    try {
        let { categoryName, unit } = req.body;

        let checkCategory = await category.findOne({ categoryName: categoryName })

        if (checkCategory) {
            return res.status(401).json({ status: 401, message: "Category Name Is Already Exiest.." })
        }

        checkCategory = await category.create({
            categoryName,
            unit
        });

        return res.status(201).json({ status: 201, message: "Category Is Created successFully..", category: checkCategory })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllCategory = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedCategory;

        paginatedCategory = await category.find();

        let count = paginatedCategory.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No Category Found.." })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize)
            paginatedCategory = paginatedCategory.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, TotalCategory: count, message: 'All Category Found Successfully..', category: paginatedCategory })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        let id = req.params.id;

        let categoryById = await category.findById(id);

        if (!categoryById) {
            return res.status(404).json({ status: 404, message: "Category Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Get Category Data Successfully...", category: categoryById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let id = req.params.id;

        let checkCategoryId = await category.findById(id);

        if (!checkCategoryId) {
            return res.status(404).json({ status: 404, message: "Category Not Found" })
        }

        checkCategoryId = await category.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Category Updated Successfully..", category: checkCategoryId })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;

        let checkCategoryId = await category.findById(id);

        if (!checkCategoryId) {
            return res.status(404).json({ status: 404, message: "Category Not Found" })
        }
        
        await category.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Category Removed Successfully.." })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}
