const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController');

userRoute.get('/', userController.getAllUsers);
userRoute.get('/:id', userController.getUserById);
userRoute.post('/', userController.createUser);
userRoute.put('/:id', userController.updateUser);
userRoute.delete('/:id', userController.deleteUser);
userRoute.post('/:id/change-password', userController.changePassword);

module.exports = userRoute;