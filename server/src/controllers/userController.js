const db = require('../models');
const User = db.User;

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Server Error!", error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Không tìm thấy user" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server Error!", error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const { userName, userAddress, userGender, userEmail, password, role } = req.body;
            const newUser = await User.create({
                userName,
                userAddress,
                userGender,
                userEmail,
                password,
                role
            });
            res.status(201).json({ message: "Tạo user thành công", userId: newUser.userId });
        } catch (error) {
            res.status(400).json({ message: "Đã xảy ra lỗi!", error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userName, userAddress, userGender, userEmail, password, role } = req.body;
            const [updated] = await User.update({
                userName,
                userAddress,
                userGender,
                userEmail,
                password,
                role
            }, {
                where: { userId: req.params.id }
            });
            if (updated) {
                const updatedUser = await User.findByPk(req.params.id);
                res.json({ message: "Cập nhật user thành công", user: updatedUser });
            } else {
                res.status(404).json({ message: "Không tìm thấy user" });
            }
        } catch (error) {
            res.status(400).json({ message: "Lỗi khi cập nhật user", error: error.message });
        }
    },

    // Xóa user
    deleteUser: async (req, res) => {
        try {
            const deleted = await User.destroy({
                where: { userId: req.params.id }
            });
            if (deleted) {
                res.json({ message: "Xóa user thành công" });
            } else {
                res.status(404).json({ message: "Không tìm thấy user" });
            }
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xóa user", error: error.message });
        }
    },

    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await User.findByPk(req.params.id);
            if (user && user.password === oldPassword) {
                await user.update({ password: newPassword });
                res.json({ message: "Đổi mật khẩu thành công!" });
            } else {
                res.status(400).json({ message: "Mật khẩu cũ không đúng hoặc không tìm thấy user" });
            }
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi!", error: error.message });
        }
    }
};

module.exports = userController;