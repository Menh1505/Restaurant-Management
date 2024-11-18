import { useState, useCallback, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import { toast } from 'react-toastify';

export const useBooking = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    const handleRequest = useCallback(async (requestFn) => {
        setLoading(true);
        setError(null);
        try {
            const result = await requestFn();
            return result;
        } catch (err) {
            setError(err);
            toast.error(err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllBookings = useCallback(async () => {
        try {
            const result = await handleRequest(bookingService.getAllBookings);
            setBookings(result.data); // Cập nhật state bookings
            return result;
        } catch (err) {
            setBookings([]);
            throw err;
        }
    }, [handleRequest]);

    const getBookingById = useCallback((id) => {
        return handleRequest(() => bookingService.getBookingById(id));
    }, [handleRequest]);

    const createBooking = useCallback(async (data) => {
        try {
            const result = await handleRequest(() => bookingService.createBooking(data));
            toast.success('Booking created successfully!');
            return result;
        } catch (err) {
            toast.error('Failed to create booking');
            throw err;
        }
    }, [handleRequest]);

    const updateBooking = useCallback(async (id, data) => {
        try {
            const result = await handleRequest(() => bookingService.updateBooking(id, data));
            setBookings(prev => prev.map(booking =>
                booking.booking_id === id ? { ...booking, ...data } : booking
            ));
            toast.success('Booking updated successfully!');
            return result;
        } catch (err) {
            toast.error('Failed to update booking');
            throw err;
        }
    }, [handleRequest]);

    const deleteBooking = useCallback(async (id) => {
        try {
            await handleRequest(() => bookingService.deleteBooking(id));
            setBookings(prev => prev.filter(booking => booking.booking_id !== id));
            toast.success('Booking deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete booking');
            throw err;
        }
    }, [handleRequest]);

    const getBookingsByDate = useCallback(async (date) => {
        try {
            const result = await handleRequest(() => bookingService.getBookingsByDate(date));
            setBookings(result.data);
            return result;
        } catch (err) {
            setBookings([]);
            throw err;
        }
    }, [handleRequest]);

    const updateBookingStatus = useCallback(async (id, status) => {
        try {
            const result = await handleRequest(() =>
                bookingService.updateBookingStatus(id, status)
            );
            setBookings(prev => prev.map(booking =>
                booking.booking_id === id
                    ? { ...booking, status: status }
                    : booking
            ));
            toast.success(`Booking ${status} successfully!`);
            return result;
        } catch (err) {
            toast.error('Failed to update booking status');
            throw err;
        }
    }, [handleRequest]);

    // Cleanup function
    useEffect(() => {
        return () => {
            setBookings([]);
            setError(null);
        };
    }, []);

    return {
        loading,
        error,
        bookings,
        getAllBookings,
        getBookingById,
        createBooking,
        updateBooking,
        deleteBooking,
        getBookingsByDate,
        updateBookingStatus
    };
};