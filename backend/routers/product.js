const {Router}=require('express');
const productController = require('../controller/productControllers')
const productRouter =Router();
productRouter.post('/product',productController.postProduct);
productRouter.get('/product',productController.getProducts)
module.exports = productRouter