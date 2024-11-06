import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const authService = {
    login: async (credentials) => {
        try {
            console.log('Sending login request:', credentials);

            const response = await axios.post(`${API_URL}/auth/login`, credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Server response:', response.data);

            // Validate response format
            if (!response.data || !response.data.success || !response.data.user) {
                throw new Error('Invalid response format from server');
            }

            // Ensure user object has required fields
            const { user } = response.data;
            if (!user.userName || !user.userEmail) {
                throw new Error('Missing required user fields');
            }

            return {
                success: true,
                user: {
                    userName: user.userName,
                    userEmail: user.userEmail,
                    // Add other needed user fields
                }
            };
        } catch (error) {
            console.error('Login request failed:', error);
            throw {
                message: error.response?.data?.message || error.message || 'Login failed',
                error: error
            };
        }
    }
};