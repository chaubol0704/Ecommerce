const UserRouter = require('./user.route')
const ProductRouter = require('./product.route')
const CartRouter = require('./cart.route')
const OrderRouter = require('./order.route')
const CommentRouter = require('./comment.route')
// const PaymentRouter = require('./PaymentRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/cart', CartRouter)
    app.use('/api/comment', CommentRouter)
    app.use('/api/order', OrderRouter)
    // app.use('/api/payment', PaymentRouter)
   
}

module.exports = routes