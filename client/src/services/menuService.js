import apiClient from '../api/apiClient';

export const menuService = {
    getAllDishes: async () => {
        const response = await apiClient.get('/dishes');
        return response.data;
    },

    getDishById: async (id) => {
        const response = await apiClient.get(`/dishes/${id}`);
        return response.data;
    },

    createDish: async (dishData) => {
        const response = await apiClient.post('/dishes', dishData);
        return response.data;
    },

    updateDish: async (id, dishData) => {
        const response = await apiClient.put(`/dishes/${id}`, dishData);
        return response.data;
    },

    deleteDish: async (id) => {
        const response = await apiClient.delete(`/dishes/${id}`);
        return response.data;
    }
};