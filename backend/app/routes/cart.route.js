const CartController = require("../controller/cart.controller");
const express = require("express");
const router = express.Router();

router.post('/create', CartController.createCart)
router.put('/update/:id', CartController.updateCart)
router.get('/get-details/:id', CartController.getDetailsCart)
router.get('/get-cartuser/:id', CartController.getCartUser)
router.delete('/delete/:id', CartController.deleteCart)
router.get('/get-all', CartController.getAllCart)


module.exports = router;