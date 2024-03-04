const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

const createCart = (newCart) => {
    return new Promise(async (resolve, reject) => {
        const { user_id, product_id, quantity, total_price } = newCart
        try {
            const newCart = await Cart.create({
                user_id, product_id, quantity, total_price
            })
            if (newCart) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newCart
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateCart = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCart = await Cart.findOne({
                _id: id
            })
            if (checkCart === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Cart is not defined'
                })
            }

            const updatedCart = await Cart.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedCart
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCart = await Cart.findOne({
                _id: id
            })
            if (checkCart === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Cart is not defined'
                })
            }

            await Cart.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Cart success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getCartUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const cart = await Cart.find({
            //     user_id: id
            // })
            const cart = await Cart.find({ user_id: id }).populate("product_id")
            if (cart === null) {
                resolve({
                    status: 'ERR',
                    message: 'The cart is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: cart
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const cart = await Cart.join(Product, "product_id", "_id", {
            //     query: { _id: id },
            //     projection: {},
            // })
            const cart = await Cart.find({ _id: id }).populate("product_id")
            if (cart === null) {
                resolve({
                    status: 'ERR',
                    message: 'The cart is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: cart
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllCart = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCart = await Cart.count()
            let allCart = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Cart.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalCart,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCart / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allCartSort = await Cart.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allCartSort,
                    total: totalCart,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalCart / limit)
                })
            }
            if (!limit) {
                allCart = await Cart.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allCart = await Cart.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allCart,
                total: totalCart,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalCart / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

// const getAllType = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const allType = await Product.distinct('type')
//             resolve({
//                 status: 'OK',
//                 message: 'Success',
//                 data: allType,
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

module.exports = {
    createCart,
    updateCart,
    getDetailsCart,
    deleteCart,
    getAllCart,
    getCartUser,
    // getAllType
}