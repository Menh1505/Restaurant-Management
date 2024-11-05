const express = require('express');
const bookingTableRoute = express.Router();
const bookingTableController = require('../controllers/bookingTableController');

bookingTableRoute.get('/date/:date', bookingTableController.getBookingsByDate);
bookingTableRoute.patch('/:id/status', bookingTableController.updateBookingStatus);
bookingTableRoute.get('/:id', bookingTableController.getBookingById);
bookingTableRoute.put('/:id', bookingTableController.updateBooking);
bookingTableRoute.delete('/:id', bookingTableController.deleteBooking);
bookingTableRoute.post('/', bookingTableController.createBooking);
bookingTableRoute.get('/', bookingTableController.getAllBookings);

module.exports = bookingTableRoute;