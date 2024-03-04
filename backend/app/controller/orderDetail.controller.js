const OrderService = require('../services/orderService')
// const OrderDetailService = require('../services/orderdetailService')
const createOrder = async (req, res) => {
    // console.log(res.body)
    try {
        const { products } = req.body
        console.log(products)
        if (!products[0]) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
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

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.getDetailsOrder(orderId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

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


const getAllOrder = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await OrderService.getAllOrder(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getOrderUser = async (req, res) => {
    try {
        const user_id = req.params.id
        if (!user_id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user is required'
            })
        }
        const response = await OrderService.getOrderUser(user_id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createOrder,
    updateOrder,
    getDetailsOrder,
    deleteOrder,
    getAllOrder,
    // deleteMany,
    getOrderUser
}