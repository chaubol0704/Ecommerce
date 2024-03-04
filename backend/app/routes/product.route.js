const express = require("express");
const ProductController = require("../controller/product.controller");

const router = express.Router();

router.post('/create', ProductController.createProduct)
router.put('/update/:id',  ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id',  ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)


module.exports = router;