import apiClient from '../api/apiClient';

const handleError = (error) => {
    if (error.response) {
        // Server trả về response với status code lỗi
        throw error.response.data;
    } else if (error.request) {
        // Request được gửi nhưng không nhận được response
        throw new Error('Không thể kết nối đến server. Vui lòng thử lại sau.');
    } else {
        // Lỗi khi setting up request
        throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
};

export const bookingService = {
    getAllBookings: async () => {
        try {
            const response = await apiClient.get('/booking-table');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getBookingById: async (id) => {
        try {
            const response = await apiClient.get(`/booking-table/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    createBooking: async (bookingData) => {
        try {
            // Format date before sending
            const formattedData = {
                ...bookingData,
                dayBooking: new Date(bookingData.dayBooking).toISOString()
            };

            const response = await apiClient.post('/booking-table', formattedData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    updateBooking: async (id, bookingData) => {
        try {
            // Format date before sending
            const formattedData = {
                ...bookingData,
                dayBooking: new Date(bookingData.dayBooking).toISOString()
            };

            const response = await apiClient.put(`/booking-table/${id}`, formattedData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    deleteBooking: async (id) => {
        try {
            const response = await apiClient.delete(`/booking-table/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getBookingsByDate: async (date) => {
        try {
            // Format date for URL
            const formattedDate = new Date(date).toISOString().split('T')[0];
            const response = await apiClient.get(`/booking-table/date/${formattedDate}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    updateBookingStatus: async (id, status) => {
        try {
            const response = await apiClient.patch(`/booking-table/${id}/status`, {
                status: Boolean(status)
            });
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }
};