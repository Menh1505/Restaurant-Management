const { User } = require('../models');

const authController = {
    login: async (req, res) => {
        try {
            // Log request body
            console.log('Received login request:', req.body);

            const { userEmail, password } = req.body;

            // Kiểm tra input
            if (!userEmail || !password) {
                console.log('Missing email or password');
                return res.status(400).json({
                    success: false,
                    message: 'Email và password là bắt buộc'
                });
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userEmail)) {
                console.log('Invalid email format:', userEmail);
                return res.status(400).json({
                    success: false,
                    message: 'Email không hợp lệ'
                });
            }

            console.log('Searching for user with email:', userEmail);

            // Tìm user theo email và password
            const user = await User.findOne({
                where: {
                    userEmail: userEmail,
                    password: password
                }
            });

            console.log('Database query result:', user ? 'User found' : 'User not found');

            // Nếu không tìm thấy user
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Email hoặc mật khẩu không đúng'
                });
            }

            // Log successful login
            console.log('Successful login for user:', user.userName);

            // Nếu tìm thấy user, trả về thông tin
            return res.json({
                success: true,
                user: {
                    userId: user.userId,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    role: user.role
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            // Log detailed error information
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });

            // Check for specific database errors
            if (error.name === 'SequelizeConnectionError') {
                return res.status(503).json({
                    success: false,
                    message: 'Không thể kết nối đến database'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Lỗi server'
            });
        }
    }
};

module.exports = authController;