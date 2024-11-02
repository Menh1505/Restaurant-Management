const express = require('express');
const bookingTableRoute = express.Router();
const bookingTableController = require('../controllers/bookingTableController');

bookingTableRoute.post('/', bookingTableController.createBooking);
bookingTableRoute.get('/', bookingTableController.getAllBookings);
bookingTableRoute.get('/:id', bookingTableController.getBookingById);
bookingTableRoute.put('/:id', bookingTableController.updateBooking);
bookingTableRoute.delete('/:id', bookingTableController.deleteBooking);

module.exports = bookingTableRoute;