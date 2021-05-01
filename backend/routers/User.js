const express = require('express');
const routers = express.Router();
const userController = require('../controllers/userController');
routers.post('/register',userController.registerCustomer);
routers.post('/login',userController.login);
routers.post('/getsession',userController.getSession);
routers.post('/logout',userController.logout)
routers.post('/registerany',userController.registerAnyRole);
routers.post('/forgetpassword',userController.forgetPassword);
module.exports=routers;