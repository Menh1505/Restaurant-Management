const express = require('express');
const dishRoute = express.Router();
const dishController = require('../controllers/dishController');

dishRoute.get('/', dishController.getAllDishes);
dishRoute.get('/:id', dishController.getDishById);
dishRoute.post('/', dishController.createDish);
dishRoute.put('/:id', dishController.updateDish);
dishRoute.delete('/:id', dishController.deleteDish);

module.exports = dishRoute;