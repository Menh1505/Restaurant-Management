import apiClient from '../api/apiClient';

export const detailInvoiceService = {
    // Lấy tất cả chi tiết hóa đơn
    getAllDetailInvoices: async () => {
        try {
            const response = await apiClient.get('/detail-invoices');
            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to fetch detail invoices');
        } catch (error) {
            console.error('Error fetching detail invoices:', error);
            throw new Error(error.response?.data?.message || 'Không thể lấy danh sách chi tiết hóa đơn');
        }
    },

    // Lấy chi tiết hóa đơn theo ID
    getDetailInvoiceById: async (id) => {
        try {
            console.log('Fetching detail invoice with ID:', id);
            const response = await apiClient.get(`/detail-invoice/${id}`);
            console.log('Response:', response);

            if (response.status === 200) {
                return response.data;
            }
            throw new Error('Failed to fetch detail invoice');
        } catch (error) {
            console.error('Error details:', error.response || error);
            throw new Error(error.response?.data?.message || 'Không thể lấy chi tiết hóa đơn');
        }
    },

    // // Tạo chi tiết hóa đơn mới
    // createDetailInvoice: async (detailData) => {
    //     try {
    //         const response = await apiClient.post('/detail-invoices', detailData);
    //         if (response.status === 201) {
    //             return response.data;
    //         }
    //         throw new Error('Failed to create detail invoice');
    //     } catch (error) {
    //         console.error('Error creating detail invoice:', error);
    //         throw new Error(error.response?.data?.message || 'Không thể tạo chi tiết hóa đơn');
    //     }
    // },

    // // Cập nhật chi tiết hóa đơn
    // updateDetailInvoice: async (id, detailData) => {
    //     try {
    //         const response = await apiClient.put(`/detail-invoices/${id}`, detailData);
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         throw new Error('Failed to update detail invoice');
    //     } catch (error) {
    //         console.error('Error updating detail invoice:', error);
    //         throw new Error(error.response?.data?.message || 'Không thể cập nhật chi tiết hóa đơn');
    //     }
    // },

    // // Xóa chi tiết hóa đơn
    // deleteDetailInvoice: async (id) => {
    //     try {
    //         const response = await apiClient.delete(`/detail-invoices/${id}`);
    //         if (response.status === 200) {
    //             return response.data;
    //         }
    //         throw new Error('Failed to delete detail invoice');
    //     } catch (error) {
    //         console.error('Error deleting detail invoice:', error);
    //         throw new Error(error.response?.data?.message || 'Không thể xóa chi tiết hóa đơn');
    //     }
    // }
};