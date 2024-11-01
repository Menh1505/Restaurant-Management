const express = require('express');
const homeRoute = express.Router();
const homeController = require('../controllers/homeController');

homeRoute.get('/', homeController.getHomePage);
homeRoute.get('/about', homeController.getAboutPage);

module.exports = homeRoute;