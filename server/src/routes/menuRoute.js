const express = require('express');
const menuRoute = express.Router();
const menuController = require('../controllers/menuController');

menuRoute.get('/', menuController.getAllMenus);
menuRoute.get('/:id', menuController.getMenuById);
menuRoute.post('/', menuController.createMenu);
menuRoute.put('/:id', menuController.updateMenu);
menuRoute.delete('/:id', menuController.deleteMenu);
menuRoute.post('/:id/dishes', menuController.addDishToMenu);
menuRoute.delete('/:id/dishes/:dishId', menuController.removeDishFromMenu);

module.exports = menuRoute;