const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');
routers.post('/register',userController.registerCustomer);
routers.post('/login',userController.login);
routers.post('/getsession',userController.getSession);
routers.post('/logout',userController.logout)
routers.post('/registerany',userController.registerAnyRole);
routers.post('/forgetpassword',userController.forgetPassword);
routers.post('/email',userController.findUser);
routers.get('/resetpassword/:id',userController.findUserById);
routers.put('/resetpassword/:id',userController.resetPassword);
module.exports=routers;