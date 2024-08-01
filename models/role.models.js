const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('Role', roleSchema);