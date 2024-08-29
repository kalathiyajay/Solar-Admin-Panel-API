const jwt = require('jsonwebtoken')
const user = require('../models/user.models')

exports.auth = (roles = []) => {
    return async (req, res, next) => {
        try {
            let authorization = req.headers["authorization"]

            if (!authorization) {
                return res.status(401).json({ status: 401, message: 'Authorize Token Is Required' })
            }
            let token = await authorization.split(' ')[1]

            if (!token) {
                return res.status(404).json({ status: 404, message: "Token Is Require" })
            }

            const checkToken = jwt.verify(token, process.env.SECRET_KEY)

            const ChekUser = await user.findById(checkToken)
            
            req.user = ChekUser;

            if (!ChekUser) {
                return res.status(404).json({ status: 404, message: "User Not Found" })
            }
            
            if (!roles.includes(ChekUser.role)) {
                return res.status(404).json({ status: 404, message: 'Unauthorize Access' })
            }

            next();

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: error.message })
        }
    }
}