const db = require('../models');
const DetailInvoice = db.DetailInvoice;

const detailInvoiceController = {
    createDetailInvoice: async (req, res) => {
        try {
            const { invoiceId, listDishesWithAmount, total } = req.body;
            const detailInvoice = await DetailInvoice.create({
                invoiceId,
                listDishesWithAmount,
                total
            });
            res.status(201).json(detailInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Không thể tạo chi tiết hóa đơn' });
        }
    },

    getAllDetailInvoices: async (req, res) => {
        try {
            const detailInvoices = await DetailInvoice.findAll();
            res.status(200).json(detailInvoices);
        } catch (error) {
            res.status(500).json({ error: 'Không tồn tại chi tiết hóa đơn' });
        }
    },

    getDetailInvoiceById: async (req, res) => {
        try {
            const { id } = req.params;
            const detailInvoice = await DetailInvoice.findByPk(id);
            if (!detailInvoice) {
                return res.status(404).json({ error: 'Không tìm thấy chi tiết hóa đơn' });
            }
            res.status(200).json(detailInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Không tồn tại chi tiết hóa đơn' });
        }
    },

    updateDetailInvoice: async (req, res) => {
        try {
            const { id } = req.params;
            const { invoiceId, listDishesWithAmount, total } = req.body;
            const detailInvoice = await DetailInvoice.findByPk(id);
            if (!detailInvoice) {
                return res.status(404).json({ error: 'Không tìm thấy chi tiết hóa đơn' });
            }

            detailInvoice.invoiceId = invoiceId;
            detailInvoice.listDishesWithAmount = listDishesWithAmount;
            detailInvoice.total = total;

            await detailInvoice.save();
            res.status(200).json(detailInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Không tồn tại chi tiết hóa đơn' });
        }
    },

    deleteDetailInvoice: async (req, res) => {
        try {
            const { id } = req.params;
            const detailInvoice = await DetailInvoice.findByPk(id);
            if (!detailInvoice) {
                return res.status(404).json({ error: 'Không tim thấy chi tiết hóa đơn' });
            }

            await detailInvoice.destroy();
            res.status(200).json({ message: 'Chi tiết hóa đơn đã được xóa!' });
        } catch (error) {
            res.status(500).json({ error: 'Xóa chi tiết hóa đơn này thất bại' });
        }
    }
};

module.exports = detailInvoiceController;