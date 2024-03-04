const express = require("express");
const OrderController = require("../controller/order.controller");

const router = express.Router();

router.post('/create', OrderController.createOrder)
router.put('/update/:id', OrderController.updateOrder)
router.get('/get-details/:id', OrderController.getDetailsOrder)
router.delete('/delete/:id', OrderController.deleteOrder)
router.get('/get-all', OrderController.getAllOrder)
router.get('/get-order/:id', OrderController.getOrderUser)


module.exports = router;