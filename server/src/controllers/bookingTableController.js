const db = require('../models');
const BookingTable = db.BookingTable;
const { Op } = require('sequelize');

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            const bookings = await BookingTable.findAll();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách đặt bàn', error });
        }
    },

    getBookingById: async (req, res) => {
        try {
            const booking = await BookingTable.findByPk(req.params.id);
            if (booking) {
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy thông tin đặt bàn', error });
        }
    },

    createBooking: async (req, res) => {
        try {
            const { customerName, customerPhoneNumber, customerEmail, personNum, dayBooking } = req.body;

            if (!customerName || !customerPhoneNumber || !customerEmail || !personNum || !dayBooking) {
                return res.status(400).json({
                    message: 'Vui lòng điền đầy đủ thông tin'
                });
            }

            const bookingDate = new Date(dayBooking);
            const today = new Date();
            if (bookingDate < today) {
                return res.status(400).json({
                    message: 'Ngày đặt bàn phải là ngày trong tương lai'
                });
            }

            const formattedBookingDate = bookingDate.toISOString().split('T')[0];

            const existingBookings = await BookingTable.findAll({
                where: {
                    dayBooking: {
                        [Op.between]: [
                            `${formattedBookingDate} 00:00:00`,
                            `${formattedBookingDate} 23:59:59`
                        ]
                    },
                    status: true
                }
            });

            const totalBooked = existingBookings.reduce((sum, booking) => sum + booking.personNum, 0);

            if (totalBooked + parseInt(personNum) > 20) {
                return res.status(400).json({
                    message: 'Không đủ chỗ trống cho ngày này'
                });
            }

            const newBooking = await BookingTable.create({
                customerName,
                customerPhoneNumber,
                customerEmail,
                personNum: parseInt(personNum),
                dayBooking: bookingDate,
                status: true
            });

            res.status(201).json({
                message: 'Đặt bàn thành công',
                data: newBooking
            });
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Dữ liệu không hợp lệ',
                    errors: error.errors.map(e => e.message)
                });
            }
            res.status(500).json({
                message: 'Lỗi khi tạo đặt bàn',
                error: error.message
            });
        }
    },

    updateBooking: async (req, res) => {
        try {
            const { customerName, customerPhoneNumber, customerEmail, personNum, dayBooking, status } = req.body;
            const booking = await BookingTable.findByPk(req.params.id);

            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
            }

            // Validate ngày đặt bàn mới
            const newBookingDate = new Date(dayBooking);
            const today = new Date();
            if (newBookingDate < today) {
                return res.status(400).json({
                    message: 'Ngày đặt bàn phải là ngày trong tương lai'
                });
            }

            // Format ngày để so sánh
            const formattedBookingDate = newBookingDate.toISOString().split('T')[0];

            // Kiểm tra số lượng chỗ nếu thay đổi ngày hoặc số người
            if (dayBooking !== booking.dayBooking || personNum !== booking.personNum) {
                const existingBookings = await BookingTable.findAll({
                    where: {
                        dayBooking: {
                            [Op.between]: [
                                `${formattedBookingDate} 00:00:00`,
                                `${formattedBookingDate} 23:59:59`
                            ]
                        },
                        status: true,
                        BookingID: {
                            [Op.ne]: req.params.id
                        }
                    }
                });

                const totalBooked = existingBookings.reduce((sum, b) => sum + b.personNum, 0);

                if (totalBooked + parseInt(personNum) > 20) {
                    return res.status(400).json({
                        message: 'Không đủ chỗ trống cho ngày này'
                    });
                }
            }

            await booking.update({
                customerName,
                customerPhoneNumber,
                customerEmail,
                personNum: parseInt(personNum),
                dayBooking: newBookingDate,
                status: Boolean(status)
            });

            res.status(200).json({
                message: 'Cập nhật đặt bàn thành công',
                data: booking
            });
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Dữ liệu không hợp lệ',
                    errors: error.errors.map(e => e.message)
                });
            }
            res.status(500).json({
                message: 'Lỗi khi cập nhật đặt bàn',
                error: error.message
            });
        }
    },

    updateBookingStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const booking = await BookingTable.findByPk(req.params.id);

            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
            }

            const newStatus = Boolean(status);

            if (newStatus === true) {
                const formattedBookingDate = booking.dayBooking.toISOString().split('T')[0];

                const existingBookings = await BookingTable.findAll({
                    where: {
                        dayBooking: {
                            [Op.between]: [
                                `${formattedBookingDate} 00:00:00`,
                                `${formattedBookingDate} 23:59:59`
                            ]
                        },
                        status: true,
                        BookingID: {
                            [Op.ne]: req.params.id
                        }
                    }
                });

                const totalBooked = existingBookings.reduce((sum, b) => sum + b.personNum, 0);

                if (totalBooked + booking.personNum > 20) {
                    return res.status(400).json({
                        message: 'Không đủ chỗ trống để kích hoạt đặt bàn này'
                    });
                }
            }

            booking.status = newStatus;
            await booking.save();

            res.status(200).json({
                message: 'Cập nhật trạng thái đặt bàn thành công',
                data: booking
            });
        } catch (error) {
            res.status(500).json({
                message: 'Lỗi khi cập nhật trạng thái đặt bàn',
                error: error.message
            });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            const booking = await BookingTable.findByPk(req.params.id);
            if (booking) {
                await booking.destroy();
                res.status(200).json({ message: 'Xóa đặt bàn thành công' });
            } else {
                res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa đặt bàn', error });
        }
    },

    getBookingsByDate: async (req, res) => {
        try {
            const { date } = req.params;
            const searchDate = new Date(date);

            const bookings = await BookingTable.findAll({
                where: {
                    dayBooking: {
                        [Op.between]: [
                            `${date} 00:00:00`,
                            `${date} 23:59:59`
                        ]
                    },
                    status: true
                }
            });

            res.status(200).json({
                message: 'Lấy danh sách đặt bàn thành công',
                data: bookings
            });
        } catch (error) {
            res.status(500).json({
                message: 'Lỗi khi lấy danh sách đặt bàn theo ngày',
                error: error.message
            });
        }
    }
};

module.exports = bookingController;