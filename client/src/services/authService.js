import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const authService = {
    login: async (credentials) => {
        try {
            console.log('Sending request to:', `${API_URL}/auth/login`);
            console.log('With credentials:', credentials);

            const response = await axios.post(`${API_URL}/auth/login`, credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response received:', response.data);
            return response.data;
        } catch (error) {
            console.error('Login request failed:', error.response || error);
            throw error.response?.data || error;
        }
    }
};