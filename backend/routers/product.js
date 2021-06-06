const {Router}=require('express');
const productController = require('../controllers/productControllers')
const productRouter =Router();
productRouter.post('/postProduct',productController.postProduct);
productRouter.get('/getProduct/:id',productController.getProducts);
productRouter.delete('/product/:id',productController.deleteProduct);
productRouter.put('/product/:id',productController.updateProduct);
productRouter.get('/listProduct',productController.listProduct);
productRouter.get('/productdetail/:id',productController.getProByID);
productRouter.get('/shoppingcart/:id',productController.getProInCart);
module.exports = productRouter