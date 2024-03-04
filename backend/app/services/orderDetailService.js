const Order = require("../models/orderModel")
const OrderDetail = require("../models/orderdetailModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { id, address, totalcost, products } = newOrder
        // const { user_id, staff_id, orderedAt, deliveredAt, status, products } = newOrder
        try {

            const newOrder = await Order.create({
                user_id: id,
                address: address,
                totalcost,
                // orderedAt, deliveredAt, 
                // status,
            })
            // console.log(newOrder)
            if (!newOrder) {
                resolve({
                    status: 'ERR',
                    message: 'Fail',
                    // data: newProduct
                })
            }
            for (const product of products) {
                await OrderDetail.create({
                    order_id: newOrder._id,
                    product_id: product.id,
                    quantity: product.quantity,
                    price: product.price,
                    discount: product.discount
                })
            }
            if (newOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newOrder
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
            const checkOrder = await OrderDetail.findOne({
                _id: id
            })
            console.log(checkOrder)
            if (checkOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Order is not defined'
                })
            }

            const updatedOrder = await OrderDetail.findByIdAndUpdate(id, data, { new: true })
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

const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await OrderDetail.findOne({
                _id: id
            })
            if (checkOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Order is not defined'
                })
            }
            
            await OrderDetail.findByIdAndDelete(id)
            
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const orders = await Order.find({ _id: id })
            if (orders === null) {
                resolve({
                    status: 'ERR',
                    message: 'The orders is not defined'
                })
            }
            const orderDetail = []
            for (const order of orders) {
                const detail = await OrderDetail.find({ order_id: order._id }).populate("product_id")
                // console.log(detail)
                orderDetail.push(
                    detail)
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                dataDetail: orderDetail,
                data: orders
            })
        } catch (e) {
            reject(e)
        }
    })
}

// const getAllOrder = (limit, page, sort, filter) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const totalOrder = await Order.count()
//             let allOrder = []
//             if (filter) {
//                 const label = filter[0];
//                 const allObjectFilter = await Order.find({ [label]: { '$regex': filter[1] } }).populate("user_id").limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     data: allObjectFilter,
//                     total: totalOrder,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalOrder / limit)
//                 })
//             }
//             if (sort) {
//                 const objectSort = {}
//                 objectSort[sort[1]] = sort[0]
//                 const allOrderSort = await Order.find().populate("user_id").limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     data: allOrderSort,
//                     total: totalOrder,
//                     pageCurrent: Number(page + 1),
//                     totalPage: Math.ceil(totalOrder / limit)
//                 })
//             }
//             if (!limit) {
//                 allOrder = await Order.find().populate("user_id").sort({ createdAt: -1, updatedAt: -1 })
//             } else {
//                 allOrder = await Order.find().populate("user_id")
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allOrder,
//                 total: totalOrder,
//                 pageCurrent: Number(page + 1),
//                 totalPage: Math.ceil(totalOrder / limit)
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
// const getOrderUser = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // const Order = await Order.find({
//             //     user_id: id
//             // })

//             const orders = await Order.find({ user_id: id })

//             if (orders === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The orders is not defined'
//                 })
//             }
//             const orderDetail = []
//             for (const order of orders) {
//                 const detail = await OrderDetail.find({ order_id: order._id }).populate("product_id")
//                 // console.log(detail)
//                 orderDetail.push({ detail, order })
//             }
//             resolve({
//                 status: 'OK',
//                 message: 'SUCESS',
//                 data: orderDetail,

//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

module.exports = {
    createOrder,
    updateOrder,
    getDetailsOrder,
    deleteOrder,
    getAllOrder,
    getOrderUser
}