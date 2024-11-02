const db = require('../models');
const Menu = db.Menu;

const menuController = {
    getAllMenus: async (req, res) => {
        try {
            const menus = await Menu.findAll();
            res.json(menus);
        } catch (error) {
            res.status(500).json({ message: "Server Error!", error: error.message });
        }
    },

    getMenuById: async (req, res) => {
        try {
            const menu = await Menu.findByPk(req.params.id);
            if (menu) {
                res.json(menu);
            } else {
                res.status(404).json({ message: "Không tìm thấy menu" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server Error!", error: error.message });
        }
    },

    createMenu: async (req, res) => {
        try {
            const { menuName, listDishes } = req.body;
            const newMenu = await Menu.create({
                menuName,
                listDishes
            });
            res.status(201).json({ message: "Tạo menu thành công", menuId: newMenu.menuId });
        } catch (error) {
            res.status(400).json({ message: "Đã xảy ra lỗi!", error: error.message });
        }
    },

    updateMenu: async (req, res) => {
        try {
            const { menuName, listDishes } = req.body;
            const [updated] = await Menu.update({
                menuName,
                listDishes
            }, {
                where: { menuId: req.params.id }
            });
            if (updated) {
                const updatedMenu = await Menu.findByPk(req.params.id);
                res.json({ message: "Cập nhật menu thành công", menu: updatedMenu });
            } else {
                res.status(404).json({ message: "Không tìm thấy menu" });
            }
        } catch (error) {
            res.status(400).json({ message: "Đã xảy ra lỗi khi cập nhật!", error: error.message });
        }
    },

    deleteMenu: async (req, res) => {
        try {
            const deleted = await Menu.destroy({
                where: { menuId: req.params.id }
            });
            if (deleted) {
                res.json({ message: "Xóa menu thành công" });
            } else {
                res.status(404).json({ message: "Không tìm thấy menu" });
            }
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi khi xóa!", error: error.message });
        }
    },

    addDishToMenu: async (req, res) => {
        try {
            const { dishId } = req.body;
            const menuId = req.params.id;

            const menu = await Menu.findByPk(menuId);
            if (!menu) {
                return res.status(404).json({ message: "Không tìm thấy menu" });
            }
            let listDishes = menu.listDishes ? menu.listDishes.split(',').map(Number) : [];

            if (listDishes.includes(Number(dishId))) {
                return res.status(400).json({ message: "Món ăn đã tồn tại trong menu" });
            }
            listDishes.push(Number(dishId));
            await menu.update({ listDishes: listDishes.join(',') });

            const updatedMenu = await Menu.findByPk(menuId);
            res.json({
                message: "Thêm món ăn vào menu thành công",
                menu: updatedMenu
            });

        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi khi thêm món ăn vào menu", error: error.message });
        }
    },

    removeDishFromMenu: async (req, res) => {
        try {
            const { dishId } = req.body;
            const menu = await Menu.findByPk(req.params.id);
            if (menu) {
                const listDishes = menu.listDishes || {};
                delete listDishes[dishId];
                await menu.update({ listDishes });
                res.json({ message: "Xóa món ăn khỏi menu thành công", menu });
            } else {
                res.status(404).json({ message: "Không tìm thấy menu" });
            }
        } catch (error) {
            res.status(400).json({ message: "Đã xảy ra lỗi khi xóa món ăn khỏi menu", error: error.message });
        }
    }
};

module.exports = menuController;