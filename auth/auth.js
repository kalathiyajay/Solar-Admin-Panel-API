const user = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userlogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        let chekEmail = await user.findOne({ email: email });

        if (!chekEmail) {
            return res.status(401).json({ status: 401, message: "Email Not Found " })
        }

        let passwordComapre = await bcrypt.compare(password, chekEmail.password);

        if (!passwordComapre) {
            return res.status(401).json({ status: 401, message: "Password Not Match" })
        }

        let token = await jwt.sign({ _id: chekEmail._id }, process.env.SECRET_KEY, { expiresIn: "5s" });

        let refreshToken = await jwt.sign({ _id: chekEmail._id }, process.env.REFRESH_TOEKN, { expiresIn: "1m" })

        chekEmail.refreshToken = refreshToken;

        await chekEmail.save();

        return res.status(200).json({ status: 200, message: "User Login SuccessFully...", user: chekEmail, AccessToken: token, refreshToken: refreshToken });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
};

exports.changePassword = async (req, res) => {
    try {
        let id = req.params.id

        let userId = await user.findById(id);

        let { currentPassword, newPassword, confirmPassword } = req.body;

        let passwordCompare = await bcrypt.compare(currentPassword, userId.password);

        if (!passwordCompare) {
            return res.status(401).json({ status: 401, message: "Current Password Not Match" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({ status: 401, message: "New Password And Confirm Password Not Match" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        let updatePassword = await user.findByIdAndUpdate(id, { password: hashPassword }, { new: true })

        return res.status(200).json({ status: 200, message: "Password Changed SuccessFully...", user: updatePassword });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
        console.log(error);
    }
}