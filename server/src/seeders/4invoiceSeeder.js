'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Invoice', [
            {
                invoiceId: 1,
                customerName: 'Alice Johnson',
                customerPhoneNumber: '123-456-7890',
                customerEmail: 'alice@example.com',
                checkIn: new Date(),
                checkOut: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
                total: 18
            },
            {
                invoiceId: 2,
                customerName: 'Bob Williams',
                customerPhoneNumber: '098-765-4321',
                customerEmail: 'bob@example.com',
                checkIn: new Date(),
                checkOut: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
                total: 38
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Invoice', null, {});
    }
};