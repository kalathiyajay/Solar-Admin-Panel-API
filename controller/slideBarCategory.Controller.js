const slideBarCategory = require('../models/slideBarCategoryModels')

exports.createSlideBarCategory = async (req, res) => {
    try {
        let { categoryName, slideBarImage } = req.body;

        let checkSlideBarCategory = await slideBarCategory.findOne({ categoryName })

        if (checkSlideBarCategory) {
            return res.status(409).json({ status: 409, message: "Slide Bar Category Alredy Added" })
        }

        if (!req.file) {
            return res.status(401).json({ status: 401, message: "slideBarImage file required" })
        }

        checkSlideBarCategory = await slideBarCategory.create({
            categoryName,
            slideBarImage: req.file.path
        });

        return res.status(201).json({ status: 201, message: "Slide Bar Category Created SuccessFully...", slideBarCategory: checkSlideBarCategory })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getAllSlideBarCategory = async (req, res) => {
    try {

        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedSlideBarCategory;

        paginatedSlideBarCategory = await slideBarCategory.find();

        let count = paginatedSlideBarCategory.length

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "Slide Bar Category Not Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize;
            let lastIndex = (startIndex + pageSize)
            paginatedSlideBarCategory = await paginatedSlideBarCategory.slice(startIndex, lastIndex);
        }

        return res.status(200).json({ status: 200, AllSlideBaRcategory: count, message: "All Slide Bar Category Found SuccessFully...", allSlideBarCateggory: paginatedSlideBarCategory })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getSlideBarCategory = async (req, res) => {
    try {
        let id = req.params.id

        let checkSlideBarId = await slideBarCategory.findById(id)

        if (!checkSlideBarId) {
            return res.status(404).json({ status: 404, message: "Slide Bar Category Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Slide Bar Category Found SuccessFully...", slideBarCategory: checkSlideBarId });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.updateSlideBarCategory = async (req, res) => {
    try {
        let id = req.params.id
        let checkSlideBarId = await slideBarCategory.findById(id)

        if (!checkSlideBarId) {
            return res.status(404).json({ status: 404, message: "Slide Bar Category Not Found" })
        }

        if (req.file) {
            req.body.slideBarImage = req.file.path
        }

        checkSlideBarId = await slideBarCategory.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Slide Bar Category Updated SuccessFully...", slideBarCategory: checkSlideBarId })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.deleteSlidBarCategory = async (req, res) => {
    try {
        let id = req.params.id

        let checkSlideBarId = await slideBarCategory.findById(id)

        if (!checkSlideBarId) {
            return res.status(404).json({ status: 404, message: "Slide Bar Category Not Found" });
        }

        await slideBarCategory.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Slide Bar Category Remove SuccessFully..." })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message })
    }
}