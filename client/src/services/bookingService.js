import apiClient from '../api/apiClient';

const handleError = (error) => {
    console.error('API Error:', error);
    if (error.response) {
        throw error.response.data;
    } else if (error.request) {
        throw new Error('Network error. Please try again.');
    } else {
        throw new Error('An error occurred. Please try again.');
    }
};

export const bookingService = {
    getAllBookings: async () => {
        try {
            console.log('Calling getAllBookings API');
            const response = await apiClient.get('/booking-table');
            console.log('API Response:', response.data);

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('getAllBookings error:', error);
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