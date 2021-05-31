const {Router}=require('express');
const productController = require('../controllers/productControllers')
const productRouter =Router();
productRouter.post('/product',productController.postProduct);
productRouter.get('/product',productController.getProducts)
module.exports = productRouter
