const express = require('express');
const detailInvoiceRoute = express.Router();
const detailInvoiceController = require('../controllers/detailInvoiceController');

detailInvoiceRoute.get('/', detailInvoiceController.getAllDetailInvoices);
detailInvoiceRoute.get('/:id', detailInvoiceController.getDetailInvoiceById);
detailInvoiceRoute.post('/', detailInvoiceController.createDetailInvoice);
detailInvoiceRoute.put('/:id', detailInvoiceController.updateDetailInvoice);
detailInvoiceRoute.delete('/:id', detailInvoiceController.deleteDetailInvoice);

module.exports = detailInvoiceRoute;