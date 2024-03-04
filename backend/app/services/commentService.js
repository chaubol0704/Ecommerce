const Comment = require("../models/commentModel")

const createComment = (newCo) => {
    return new Promise(async (resolve, reject) => {
        const { user_id, product_id, status } = newCo
        // const { user_id, staff_id, orderedAt, deliveredAt, status, products } = newOrder
        try {

            const newComment = await Comment.create({
                user_id: user_id,
                product_id: product_id,
                status,
                // CommentedAt, deliveredAt, 
                // status,
            })
            // console.log(newComment)
            if (!newComment) {
                resolve({
                    status: 'ERR',
                    message: 'Fail',
                    // data: newProduct
                })
            }
            if (newComment) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newComment
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id: id
            })
            console.log(checkOrder)
            if (checkOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Order is not defined'
                })
            }

            const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

// const deleteOrder = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkOrder = await Order.findOne({
//                 _id: id
//             })
//             if (checkOrder === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The Order is not defined'
//                 })
//             }

//             await Order.findByIdAndDelete(id)
//             const orderDetails = await OrderDetail.find({ order_id: id });

//             for (const orderDetail of orderDetails) {
//                 await OrderDetail.findByIdAndRemove({ _id: orderDetail._id });
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllComment = (product_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const Order = await Order.find({
            //     user_id: id
            // })

            const comment = await Comment.find({ product_id: product_id }).populate("user_id")

            if (comment === null) {
                resolve({
                    status: 'ERR',
                    message: 'The comment is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: comment,

            })
        } catch (e) {
            reject(e)
        }
    })
}


// const getAllComment = (limit, page, sort, filter, product_id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const totalComment = await Comment.count()
//             let allComment = []
//             if (sort) {
//                 const objectSort = {}
//                 objectSort[sort[1]] = sort[0]
//                 const allCommentSort = await Comment.find({product_id: product_id}).populate("user_id").limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     data: allCommentSort,
//                     total: totalComment,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalComment / limit)
//                 })
//             }
//             if (!limit) {
//                 allComment = await Comment.find({product_id: product_id}).populate("user_id").sort({ createdAt: -1, updatedAt: -1 })
//             } else {
//                 allComment = await Comment.find({product_id: product_id}).populate("user_id")
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allComment,
//                 total: totalComment,
//                 pageCurrent: Number(page + 1),
//                 totalPage: Math.ceil(totalComment / limit)
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }


module.exports = {
    createComment,
    // updateComment,

    // deleteComment,
    getAllComment,
}