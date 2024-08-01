const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    contact: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('user', userSchema);