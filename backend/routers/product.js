const {Router}=require('express');
const productController = require('../controllers/productControllers')
const productRouter =Router();
productRouter.post('/postProduct',productController.postProduct);
productRouter.get('/getProduct',productController.getProducts);
productRouter.get('/listProduct',productController.listProduct);
productRouter.get('/productdetail/:id',productController.getProByID);
productRouter.get('/shoppingcart/:id',productController.getProInCart);
module.exports = productRouter