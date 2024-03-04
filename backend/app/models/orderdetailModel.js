const mongoose = require('mongoose')


const orderdetailSchema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number
    }

}, {
    timestamps: true //important
})


module.exports = mongoose.model("OrderDetail", orderdetailSchema)