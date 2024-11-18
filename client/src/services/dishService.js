import apiClient from '../api/apiClient';

const handleError = (error) => {
    if (error.response) {
        throw error.response.data;
    } else if (error.request) {
        throw new Error('Không thể kết nối đến server');
    } else {
        throw new Error('Lỗi khi gửi yêu cầu');
    }
};

export const dishService = {
    getAllDishes: async () => {
        try {
            const response = await apiClient.get('/dishes');
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    getDishById: async (id) => {
        try {
            const response = await apiClient.get(`/dishes/${id}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    createDish: async (dishData) => {
        try {
            const validatedData = {
                dishName: dishData.dishName?.trim(),
                dishPrice: parseFloat(dishData.dishPrice),
                dishImage: dishData.dishImage?.trim(),
                dishDetail: dishData.dishDetail?.trim()
            };

            if (!validatedData.dishName || !validatedData.dishPrice) {
                throw new Error('Tên món và giá không được để trống');
            }

            const response = await apiClient.post('/dishes', validatedData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    updateDish: async (dishId, dishData) => {
        try {
            const validatedData = {
                dishName: dishData.dishName?.trim(),
                dishPrice: parseFloat(dishData.dishPrice),
                dishImage: dishData.dishImage?.trim(),
                dishDetail: dishData.dishDetail?.trim()
            };

            if (!validatedData.dishName || !validatedData.dishPrice) {
                throw new Error('Tên món và giá không được để trống');
            }

            const response = await apiClient.put(`/dishes/${dishId}`, validatedData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    deleteDish: async (dishId) => {
        try {
            const response = await apiClient.delete(`/dishes/${dishId}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }
};