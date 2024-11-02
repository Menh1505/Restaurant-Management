import apiClient from '../api/apiClient';

export const bookingService = {
    createBooking: async (bookingData) => {
        const response = await apiClient.post('/bookings', bookingData);
        return response.data;
    },

    getBookings: async () => {
        const response = await apiClient.get('/bookings');
        return response.data;
    },

    updateBooking: async (id, bookingData) => {
        const response = await apiClient.put(`/bookings/${id}`, bookingData);
        return response.data;
    },

    deleteBooking: async (id) => {
        const response = await apiClient.delete(`/bookings/${id}`);
        return response.data;
    }
};