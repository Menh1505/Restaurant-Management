import React, { createContext, useContext, useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Thêm loading state

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
        setIsLoading(false);
    }, []);

    const login = async (credentials) => {
        setError(null); // Reset error state
        try {
            const response = await authService.login(credentials);
            if (response.success && response.user) {
                const userData = {
                    userName: response.user.userName,
                    userEmail: response.user.userEmail,
                    role: response.user.role
                };
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
                return response;
            }
            throw new Error('Login failed');
        } catch (err) {
            setError(err.message);
            setIsAuthenticated(false);
            setUser(null);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
        localStorage.clear(); // Xóa tất cả localStorage
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        error,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};