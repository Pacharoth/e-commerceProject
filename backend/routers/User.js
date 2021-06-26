const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');
const router = require('./feedbackRouter');
routers.post('/register',userController.registerCustomer);
routers.post('/login',userController.login);
routers.post('/getsession',userController.getSession);
routers.post('/logout',userController.logout)
routers.post('/registerany',userController.registerAnyRole);
routers.post('/forgetpassword',userController.forgetPassword);
routers.post('/email',userController.findUser);
router.get('/getcustomer/:id', userController.getCustomerByID);
routers.get('/resetpassword/:id',userController.findUserById);
routers.put('/resetpassword/:id',userController.resetPassword);
routers.put('/customer/:id', userController.updateCustomerByID);

module.exports=routers;