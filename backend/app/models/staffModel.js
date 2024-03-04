const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: { type: String },
    role: {
        type: Number,
        default: 0
    },
    isAdmin: { type: Boolean, default: false, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('Staff', staffSchema)