const CommentService = require('../services/commentService')
// const OrderDetailService = require('../services/orderdetailService')
const createComment = async (req, res) => {
    // console.log(res.body)
    try {
        const { product_id, user_id } = req.body
        if (!product_id || !user_id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await CommentService.createComment(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        // console.log(orderId)
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.updateOrder(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const getDetailsOrder = async (req, res) => {
//     try {
//         const orderId = req.params.id
//         if (!orderId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The orderId is required'
//             })
//         }
//         const response = await OrderService.getDetailsOrder(orderId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

const deleteOrder = async (req, res) => {
    try {
        const OrderId = req.params.id
        console.log(OrderId)
        if (!OrderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The OrderId is required'
            })
        }
        const response = await OrderService.deleteOrder(OrderId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


// const getAllComment = async (req, res) => {
//     try {
//         const { limit, page, sort, filter, product_id } = req.query
//         const response = await CommentService.getAllComment(Number(limit) || null, Number(page) || 0, sort, filter, product_id)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

const getAllComment = async (req, res) => {
    try {
        const product_id = req.params.id
        if (!product_id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product is required'
            })
        }
        const response = await CommentService.getAllComment(product_id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createComment,
    // updateComment,
    // getDetailsComment,
    // deleteComment,
    getAllComment,
    // deleteMany,
    // getOrderUser
}