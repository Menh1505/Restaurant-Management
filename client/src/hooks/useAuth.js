import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (credentials) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await authService.login(credentials);
            localStorage.setItem('token', data.token);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            localStorage.removeItem('token');
        }
    }, []);

    return { login, logout, isLoading, error };
};