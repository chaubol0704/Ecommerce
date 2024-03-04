const CartService = require('../services/cartService')

const createCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity, total_price } = req.body
        if (!user_id || !product_id ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CartService.createCart(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const CartId = req.params.id
        const data = req.body
        if (!CartId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CartId is required'
            })
        }
        const response = await CartService.updateCart(CartId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsCart = async (req, res) => {
    try {
        const CartId = req.params.id
        if (!CartId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CartId is required'
            })
        }
        const response = await CartService.getDetailsCart(CartId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getCartUser = async (req, res) => {
    try {
        const user_id = req.params.id
        if (!user_id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await CartService.getCartUser(user_id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteCart = async (req, res) => {
    try {
        const CartId = req.params.id
        if (!CartId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The CartId is required'
            })
        }
        const response = await CartService.deleteCart(CartId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const deleteMany = async (req, res) => {
//     try {
//         const ids = req.body.ids
//         if (!ids) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The ids is required'
//             })
//         }
//         const response = await ProductService.deleteManyProduct(ids)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

const getAllCart = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await CartService.getAllCart(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const getAllType = async (req, res) => {
//     try {
//         const response = await CartService.getAllType()
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

module.exports = {
    createCart,
    updateCart,
    getDetailsCart,
    deleteCart,
    getAllCart,
    getCartUser,
    // deleteMany,
    // getAllType
}