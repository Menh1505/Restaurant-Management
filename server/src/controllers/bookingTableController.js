const db = require('../models');
const BookingTable = db.BookingTable;

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

            // Kiểm tra số lượng chỗ còn trống
            const existingBookings = await BookingTable.findAll({
                where: {
                    dayBooking: dayBooking,
                    status: 'confirmed'
                }
            });

            const totalBooked = existingBookings.reduce((sum, booking) => sum + booking.personNum, 0);

            if (totalBooked + personNum > 20) {
                return res.status(400).json({ message: 'Không đủ chỗ trống cho ngày này' });
            }

            const newBooking = await BookingTable.create({
                customerName,
                customerPhoneNumber,
                customerEmail,
                personNum,
                dayBooking,
                status: true
            });
            res.status(201).json(newBooking);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo đặt bàn', error });
        }
    },

    updateBooking: async (req, res) => {
        try {
            const { customerName, customerPhoneNumber, customerEmail, personNum, dayBooking, status } = req.body;
            const booking = await BookingTable.findByPk(req.params.id);

            if (booking) {
                // Kiểm tra số lượng chỗ nếu thay đổi ngày hoặc số người
                if (dayBooking !== booking.dayBooking || personNum !== booking.personNum) {
                    const existingBookings = await BookingTable.findAll({
                        where: {
                            dayBooking: dayBooking,
                            status: true,
                            BookingID: {
                                [db.Sequelize.Op.ne]: req.params.id
                            }
                        }
                    });

                    const totalBooked = existingBookings.reduce((sum, b) => sum + b.personNum, 0);

                    if (totalBooked + personNum > 20) {
                        return res.status(400).json({ message: 'Không đủ chỗ trống cho ngày này' });
                    }
                }

                // Cập nhật thông tin booking
                await booking.update({
                    customerName,
                    customerPhoneNumber,
                    customerEmail,
                    personNum,
                    dayBooking,
                    status: Boolean(status)  // Chuyển đổi status sang boolean
                });

                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
            }
        } catch (error) {
            console.error('Error in updateBooking:', error);
            res.status(500).json({
                message: 'Lỗi khi cập nhật đặt bàn',
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

    updateBookingStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const booking = await BookingTable.findByPk(req.params.id);

            if (booking) {
                if (status === 'confirmed') {
                    // Kiểm tra lại số lượng chỗ khi xác nhận đặt bàn
                    const existingBookings = await Booking.findAll({
                        where: {
                            dayBooking: booking.dayBooking,
                            status: 'confirmed',
                            BookingID: { [db.Sequelize.Op.ne]: req.params.id }
                        }
                    });

                    const totalBooked = existingBookings.reduce((sum, b) => sum + b.personNum, 0);

                    if (totalBooked + booking.personNum > 20) {
                        return res.status(400).json({ message: 'Không đủ chỗ trống để xác nhận đặt bàn này' });
                    }
                }

                booking.status = status;
                await booking.save();
                res.status(200).json(booking);
            } else {
                res.status(404).json({ message: 'Không tìm thấy đặt bàn' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái đặt bàn', error });
        }
    },

    getBookingsByDate: async (req, res) => {
        try {
            const { date } = req.params;
            const bookings = await BookingTable.findAll({
                where: {
                    dayBooking: date,
                    status: ['pending', 'confirmed']
                }
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách đặt bàn theo ngày', error });
        }
    }
};

module.exports = bookingController;