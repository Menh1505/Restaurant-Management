// client/src/api/bookingService.js
import apiClient from '../api/apiClient';

export const bookingService = {
    // Lấy tất cả bookings
    getAllBookings: async () => {
        try {
            const response = await apiClient.get('/booking-table');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy booking theo ID
    getBookingById: async (id) => {
        try {
            const response = await apiClient.get(`/booking-table/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Tạo booking mới
    createBooking: async (bookingData) => {
        try {
            const response = await apiClient.post('/booking-table', bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Cập nhật booking
    updateBooking: async (id, bookingData) => {
        try {
            const response = await apiClient.put(`/booking-table/${id}`, bookingData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Xóa booking
    deleteBooking: async (id) => {
        try {
            const response = await apiClient.delete(`/booking-table/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Lấy bookings theo ngày
    getBookingsByDate: async (date) => {
        try {
            const response = await apiClient.get(`/booking-table/date/${date}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Cập nhật trạng thái booking
    updateBookingStatus: async (id, status) => {
        try {
            const response = await apiClient.patch(`/booking-table/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};