import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
                console.log('Loaded user from storage:', parsedUser);
            } catch (err) {
                console.error('Error parsing stored user:', err);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            if (response.success && response.user) {
                const userData = {
                    userName: response.user.userName,
                    userEmail: response.user.userEmail,
                };
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
                return response;
            }
            throw new Error('Login failed');
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return {
        isAuthenticated,
        user,
        login,
        logout,
        error
    };
};