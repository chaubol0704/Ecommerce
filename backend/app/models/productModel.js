const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

}, {
    timestamps: true //important
})


module.exports = mongoose.model("Product", productSchema)