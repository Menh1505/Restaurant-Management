import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await authService.login(credentials);
            return response;
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        }
    };

    return { login, error };
};