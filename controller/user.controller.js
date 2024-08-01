const user = require('../models/user.models');
const roles = require('../models/role.models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createNewUser = async (req, res) => {
    try {
        let { name, email, password, contact, address, city, state, country, image, role } = req.body;

        let chekUser = await user.findOne({ email: req.body.email })

        let checkRole = await roles.findOne({ roleName: req.body.role })

        if (chekUser) {
            return res.status(401).json({ status: 401, message: "User already Exists" });
        }

        if (!req.file) {
            return res.status(401).json({ status: 401, message: "User Image file required" })
        }

        if (!checkRole) {
            return res.status(404).json({ status: 404, message: "Role Not found" });
        }

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);

        chekUser = await user.create({
            name,
            email,
            password: hashPassword,
            contact,
            address,
            city,
            state,
            country,
            image: req.file.path,
            role
        });

        return res.status(201).json({ status: 201, message: "User Created Successfully", user: chekUser });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedUser;

        paginatedUser = await user.find();

        let count = paginatedUser.length;

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "User Not Found  " })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedUser = paginatedUser.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalUsers: count, message: "All User Found SuccessFully", user: paginatedUser })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id

        let userFindById = await user.findById(id);

        if (!userFindById) {
            return res.status(404).json({ status: 404, message: "User Not Found" })
        }

        return res.status(200).json({ status: 200, message: "User Found SuccessFully", user: userFindById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id

        let userUpdateById = await user.findById(id);

        if (!userUpdateById) {
            return res.status(401).json({ status: 401, message: "User Not Found" })
        }

        if (req.body.role) {
            let checkRole = await roles.findOne({ roleName: req.body.role })

            if (!checkRole) {
                return res.status(404).json({ status: 404, message: "Role not Found" });
            }
        }

        if (req.file) {
            req.body.image = req.file.path
        }

        userUpdateById = await user.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "User Updated SuccessFully", user: userUpdateById })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.removeUser = async (req, res) => {
    try {
        let id = req.params.id

        let removeUser = await user.findById(id);

        if (!removeUser) {
            return res.status(404).json({ status: 404, message: "User Not Found" })
        }

        await user.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "User Deleted SuccessFully" })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.refreshToken = async (req, res) => {
    try {
        let checkToken = req.body.refreshToken;

        if (!checkToken) {
            return res.json({ status: 401, message: "Unauthorized" })
        }

        const decodedToken = await jwt.verify(checkToken, process.env.REFRESH_TOEKN)

        let userId = await user.findById(decodedToken._id);

        if (!userId) {
            return res.json({ status: 401, message: "Invalid Refrsh Token" })
        }

        console.log(userId.refreshToken);

        if (checkToken !== userId.refreshToken) {
            return res.json({ status: 401, message: "Refresh token is expired" })
        }

        let token = await jwt.sign({ _id: userId._id }, process.env.SECRET_KEY, { expiresIn: "1H" });

        let refreshToken = await jwt.sign({ _id: userId._id }, process.env.REFRESH_TOEKN);

        userId.refreshToken = refreshToken;
        await userId.save();

        return res.status(200).json({ status: 200, message: "Access Token Refreshed", accessToken: token, refreshToken: refreshToken })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
}   