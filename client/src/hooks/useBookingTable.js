// client/src/hooks/useBooking.js
import { useState, useCallback } from 'react';
import { bookingService } from '../services/bookingService';

export const useBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequest = useCallback(async (requestFn) => {
        setLoading(true);
        setError(null);
        try {
            const result = await requestFn();
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllBookings = useCallback(() => {
        return handleRequest(bookingService.getAllBookings);
    }, [handleRequest]);

    const getBookingById = useCallback((id) => {
        return handleRequest(() => bookingService.getBookingById(id));
    }, [handleRequest]);

    const createBooking = useCallback((data) => {
        return handleRequest(() => bookingService.createBooking(data));
    }, [handleRequest]);

    const updateBooking = useCallback((id, data) => {
        return handleRequest(() => bookingService.updateBooking(id, data));
    }, [handleRequest]);

    const deleteBooking = useCallback((id) => {
        return handleRequest(() => bookingService.deleteBooking(id));
    }, [handleRequest]);

    const getBookingsByDate = useCallback((date) => {
        return handleRequest(() => bookingService.getBookingsByDate(date));
    }, [handleRequest]);

    const updateBookingStatus = useCallback((id, status) => {
        return handleRequest(() => bookingService.updateBookingStatus(id, status));
    }, [handleRequest]);

    return {
        loading,
        error,
        getAllBookings,
        getBookingById,
        createBooking,
        updateBooking,
        deleteBooking,
        getBookingsByDate,
        updateBookingStatus
    };
};