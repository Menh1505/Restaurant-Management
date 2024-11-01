const db = require('../models');
const Dish = db.Dish;

const dishController = {
    getAllDishes: async (req, res) => {
        try {
            const dishes = await Dish.findAll();
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách món ăn', error });
        }
    },
    // Lấy một món ăn theo ID
    getDishById: async (req, res) => {
        try {
            const dish = await Dish.findByPk(req.params.id);
            if (dish) {
                res.status(200).json(dish);
            } else {
                res.status(404).json({ message: 'Không tìm thấy món ăn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy món ăn', error });
        }
    },
    // Tạo một món ăn mới
    createDish: async (req, res) => {
        try {
            const { dishName, dishPrice, dishImage, dishDetail } = req.body; // Lấy dữ liệu từ request body
            const newDish = await Dish.create({ dishName, dishPrice, dishImage, dishDetail }); // Tạo bản ghi mới
            res.status(201).json(newDish); // Trả về món ăn vừa tạo với mã 201 (Created)
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo món ăn', error });
        }
    },
    // Cập nhật một món ăn
    updateDish: async (req, res) => {
        try {
            const { dishName, dishPrice, dishImage, dishDetail } = req.body; // Lấy dữ liệu cập nhật từ request body
            const dish = await Dish.findByPk(req.params.id); // Tìm món ăn cần cập nhật
            if (dish) {
                // Cập nhật giá trị cho các thuộc tính
                dish.dishName = dishName;
                dish.dishPrice = dishPrice;
                dish.dishImage = dishImage;
                dish.dishDetail = dishDetail;
                await dish.save(); // Lưu thay đổi vào cơ sở dữ liệu
                res.status(200).json(dish); // Trả về món ăn sau khi cập nhật với mã 200
            } else {
                res.status(404).json({ message: 'Không tìm thấy món ăn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật món ăn', error });
        }
    },
    // Xóa một món ăn
    deleteDish: async (req, res) => {
        try {
            const dish = await Dish.findByPk(req.params.id); // Tìm món ăn theo ID
            if (dish) {
                await dish.destroy(); // Xóa bản ghi
                res.status(200).json({ message: 'Xóa món ăn thành công' });
            } else {
                res.status(404).json({ message: 'Không tìm thấy món ăn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa món ăn', error });
        }
    }
};

module.exports = dishController;