const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        require: true
    },


}, {
    timestamps: true //important
})


module.exports = mongoose.model("Comment", commentSchema)