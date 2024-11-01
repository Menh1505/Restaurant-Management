const db = require('../models');
const Invoice = db.Invoice;

const invoiceController = {
    getAllInvoices: async (req, res) => {
        try {
            const invoices = await Invoice.findAll();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách hóa đơn', error });
        }
    },

    getInvoiceById: async (req, res) => {
        try {
            const invoice = await Invoice.findByPk(req.params.id);
            if (invoice) {
                res.status(200).json(invoice);
            } else {
                res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy hóa đơn', error });
        }
    },

    createInvoice: async (req, res) => {
        try {
            const { customerName, customerPhoneNumber, customerEmail, checkIn, checkOut, detailId, total } = req.body;
            const newInvoice = await Invoice.create({
                customerName,
                customerPhoneNumber,
                customerEmail,
                checkIn,
                checkOut,
                detailId,
                total
            });
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo hóa đơn', error });
        }
    },

    updateInvoice: async (req, res) => {
        try {
            const { customerName, customerPhoneNumber, customerEmail, checkIn, checkOut, detailId, total } = req.body;
            const invoice = await Invoice.findByPk(req.params.id);
            if (invoice) {
                invoice.customerName = customerName;
                invoice.customerPhoneNumber = customerPhoneNumber;
                invoice.customerEmail = customerEmail;
                invoice.checkIn = checkIn;
                invoice.checkOut = checkOut;
                invoice.detailId = detailId;
                invoice.total = total;
                await invoice.save(); // Lưu các thay đổi
                res.status(200).json(invoice);
            } else {
                res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật hóa đơn', error });
        }
    },

    deleteInvoice: async (req, res) => {
        try {
            const invoice = await Invoice.findByPk(req.params.id);
            if (invoice) {
                await invoice.destroy(); // Xóa hóa đơn
                res.status(200).json({ message: 'Xóa hóa đơn thành công' });
            } else {
                res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa hóa đơn', error });
        }
    }
};

module.exports = invoiceController;