const role = require('../models/role.models');

exports.createRole = async (req, res) => {
    try {
        let { roleName, description } = req.body;

        let chekRole = await role.findOne({ roleName: roleName })

        if (chekRole) {
             return res.status(401).json({ status: 401, message: "Role Is Alredy added...  " })
        }

        chekRole = await role.create({
            roleName,
            description
        });

        return res.status(201).json({ status: 201, message: "Role Added Successfully...  ", role: chekRole })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less than 1" })
        }

        let paginatedRole;

        paginatedRole = await role.find();

        let count = paginatedRole.length;

        if (count === 0) {
             return res.status(404).json({ status: 404, message: "Role Not Found  " })
        }

        if (page && pageSize) {
            startIndex = (page - 1) * pageSize;
            lastIndex = (startIndex + pageSize);
            paginatedRole = paginatedRole.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalRoles: count, message: "All Role Found SuccessFully", role: paginatedRole })
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}

exports.getRoleById = async (req, res) => {
    try {
        let id = req.params.id;

        let checkRoleId = await role.findById(id);

        if (!checkRoleId) {
             return res.status(404).json({ status: 404, message: "Role Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Role Found SuccessFully", role: checkRoleId });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.upadetRoleById = async (req, res) => {
    try {
        let id = req.params.id;

        let updateRoleId = await role.findById(id);

        if (!updateRoleId) {
             return res.status(404).json({ status: 404, message: "Role Not Found" })
        }

        let updateRole = await role.findByIdAndUpdate(id, { ...req.body }, { new: true });

        return res.status(200).json({ status: 200, message: "Role Updated SuccessFully.....", role: updateRole })

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.deleteRoleById = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteRoleId = await role.findById(id);

        if (!deleteRoleId) {
             return res.status(404).json({ status: 404, message: "Role Not Found" })
        }
        
        await role.findByIdAndDelete(id);

        return res.status(200).json({ status: 200, message: "Role Deleted SuccessFully", });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}