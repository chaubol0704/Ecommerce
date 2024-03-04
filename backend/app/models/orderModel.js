const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // staff_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Staff',
    //     required: true
    // },
    orderedAt: {
        type: Date,
        require: true
    },
    deliveredAt: {
        type: Date,
        require: true
    },
    address: {
        type: String
    },
    totalcost: {
        type: Number
    },
    status: {
        type: String
    },
    duyet:{
        type: Boolean
    }

}, {
    timestamps: true //important
})


module.exports = mongoose.model("Order", orderSchema)