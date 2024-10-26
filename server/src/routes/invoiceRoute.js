const express = require('express');
const invoiceRoute = express.Router();
const invoiceController = require('../controllers/invoiceController');

invoiceRoute.get('/', invoiceController.getAllInvoices);
invoiceRoute.get('/:id', invoiceController.getInvoiceById);
invoiceRoute.post('/', invoiceController.createInvoice);
invoiceRoute.put('/:id', invoiceController.updateInvoice);
invoiceRoute.delete('/:id', invoiceController.deleteInvoice);

module.exports = invoiceRoute;