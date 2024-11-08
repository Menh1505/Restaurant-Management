import apiClient from '../api/apiClient';

export const invoiceService = {
    // Lấy tất cả hóa đơn
    getAllInvoices: async () => {
        try {
            const response = await apiClient.get('/invoices');
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to fetch invoices');
        } catch (error) {
            console.error('Error fetching invoices:', error);
            throw new Error(error.response?.data?.message || 'Không thể lấy danh sách hóa đơn');
        }
    },

    // getInvoiceDetail: async (detailId) => {
    //     try {
    //         const response = await apiClient.get(`/detail-invoice/${detailId}`);
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         throw new Error('Failed to fetch invoice detail');
    //     } catch (error) {
    //         console.error('Error fetching invoice detail:', error);
    //         throw new Error(error.response?.data?.message || 'Không thể lấy chi tiết hóa đơn');
    //     }
    // },

    // Lấy hóa đơn theo ID
    getInvoiceById: async (id) => {
        try {
            const response = await apiClient.get(`/invoices/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to fetch invoice');
        } catch (error) {
            console.error('Error fetching invoice:', error);
            throw new Error(error.response?.data?.message || 'Không thể lấy thông tin hóa đơn');
        }
    },

    // Lấy doanh thu theo khoảng thời gian
    getRevenueByDateRange: async (startDate, endDate) => {
        try {
            const response = await apiClient.get('/detail', {
                params: { startDate, endDate }
            });
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to fetch revenue data');
        } catch (error) {
            console.error('Error fetching revenue:', error);
            throw new Error(error.response?.data?.message || 'Không thể lấy dữ liệu doanh thu');
        }
    },

    // Tạo hóa đơn mới
    createInvoice: async (invoiceData) => {
        try {
            const response = await apiClient.post('/invoices', invoiceData);
            if (response.status === 201) {
                return response.data;
            }
            throw new Error('Failed to create invoice');
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw new Error(error.response?.data?.message || 'Không thể tạo hóa đơn');
        }
    },

    // Cập nhật hóa đơn
    updateInvoice: async (id, invoiceData) => {
        try {
            const response = await apiClient.put(`/invoices/${id}`, invoiceData);
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to update invoice');
        } catch (error) {
            console.error('Error updating invoice:', error);
            throw new Error(error.response?.data?.message || 'Không thể cập nhật hóa đơn');
        }
    },

    // Xóa hóa đơn
    deleteInvoice: async (id) => {
        try {
            const response = await apiClient.delete(`/invoices/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to delete invoice');
        } catch (error) {
            console.error('Error deleting invoice:', error);
            throw new Error(error.response?.data?.message || 'Không thể xóa hóa đơn');
        }
    },

    // Tính tổng doanh thu
    calculateTotalRevenue: (invoices) => {
        return invoices.reduce((total, invoice) => total + parseFloat(invoice.total), 0);
    }
};