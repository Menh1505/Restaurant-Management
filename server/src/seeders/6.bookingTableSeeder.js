// seeders/YYYYMMDDHHMMSS-sample-booking-seeder.js

'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Tạo ngày mai
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(18, 0, 0, 0); // Đặt giờ là 18:00

        const sampleBooking = {
            customerName: 'Nguyễn Văn A',
            customerPhoneNumber: '0123456789',
            customerEmail: 'nguyenvana@example.com',
            personNum: 4,
            dayBooking: tomorrow,
            status: true
        };

        return queryInterface.bulkInsert('Booking', [sampleBooking], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Booking', {
            customerEmail: 'nguyenvana@example.com'
        }, {});
    }
};