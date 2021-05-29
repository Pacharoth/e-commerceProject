const {Router}=require('express');
const productController = require('../controllers/productControllers')
const productRouter =Router();
productRouter.post('/postProduct',productController.postProduct);
productRouter.get('/getProduct',productController.getProducts)
module.exports = productRouter