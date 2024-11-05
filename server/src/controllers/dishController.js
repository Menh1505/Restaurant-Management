const db = require('../models');
const Dish = db.Dish;

const dishController = {
    getAllDishes: async (req, res) => {
        try {
            const dishes = await Dish.findAll();
            res.status(200).json(dishes);
        } catch (error) {
            console.error('Error in getAllDishes:', error);
            res.status(500).json({
                message: 'Lỗi khi lấy danh sách món ăn',
                error: error.message
            });
        }
    },

    getDishById: async (req, res) => {
        try {
            const dish = await Dish.findByPk(req.params.id);
            if (dish) {
                res.status(200).json(dish);
            } else {
                res.status(404).json({ message: 'Không tìm thấy món ăn' });
            }
        } catch (error) {
            console.error('Error in getDishById:', error);
            res.status(500).json({
                message: 'Lỗi khi lấy món ăn',
                error: error.message
            });
        }
    },

    createDish: async (req, res) => {
        try {
            const { dishName, dishPrice, dishImage, dishDetail } = req.body;

            if (!dishName || !dishPrice) {
                return res.status(400).json({
                    message: 'Tên món và giá không được để trống'
                });
            }

            const price = parseFloat(dishPrice);
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({
                    message: 'Giá món ăn không hợp lệ'
                });
            }

            const newDish = await Dish.create({
                dishName: dishName.trim(),
                dishPrice: price,
                dishImage: dishImage?.trim(),
                dishDetail: dishDetail?.trim()
            });

            res.status(201).json(newDish);
        } catch (error) {
            console.error('Error in createDish:', error);
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json({
                    message: 'Dữ liệu không hợp lệ',
                    errors: error.errors.map(e => e.message)
                });
            } else {
                res.status(500).json({
                    message: 'Lỗi khi tạo món ăn',
                    error: error.message
                });
            }
        }
    },

    updateDish: async (req, res) => {
        try {
            const dishId = req.params.id; // params.id từ URL
            const { dishName, dishPrice, dishImage, dishDetail } = req.body;

            // Validate required fields
            if (!dishName || !dishPrice) {
                return res.status(400).json({
                    message: 'Tên món và giá không được để trống'
                });
            }

            // Validate price
            const price = parseFloat(dishPrice);
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({
                    message: 'Giá món ăn không hợp lệ'
                });
            }

            const dish = await Dish.findByPk(dishId); // Tìm theo dishId
            if (!dish) {
                return res.status(404).json({
                    message: 'Không tìm thấy món ăn'
                });
            }

            // Update dish
            await dish.update({
                dishName: dishName.trim(),
                dishPrice: price,
                dishImage: dishImage?.trim(),
                dishDetail: dishDetail?.trim()
            });

            // Fetch updated dish to return
            const updatedDish = await Dish.findByPk(dishId);
            res.status(200).json(updatedDish);
        } catch (error) {
            console.error('Error in updateDish:', error);
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json({
                    message: 'Dữ liệu không hợp lệ',
                    errors: error.errors.map(e => e.message)
                });
            } else {
                res.status(500).json({
                    message: 'Lỗi khi cập nhật món ăn',
                    error: error.message
                });
            }
        }
    },

    deleteDish: async (req, res) => {
        try {
            const dishId = req.params.id;
            const dish = await Dish.findByPk(dishId);

            if (!dish) {
                return res.status(404).json({
                    message: 'Không tìm thấy món ăn'
                });
            }

            await dish.destroy();
            res.status(200).json({
                message: 'Xóa món ăn thành công'
            });
        } catch (error) {
            console.error('Error in deleteDish:', error);
            res.status(500).json({
                message: 'Lỗi khi xóa món ăn',
                error: error.message
            });
        }
    }
};

module.exports = dishController;