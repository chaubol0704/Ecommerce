const mongoose = require('mongoose')


const detailSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price_order: {
        type: Number,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    discount: { type: Number },

}, {
    timestamps: true //important
})


module.exports = mongoose.model("Detail", detailSchema)