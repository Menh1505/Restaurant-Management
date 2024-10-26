'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('DetailInvoice', [
            {
                invoiceId: 1,
                listDishesWithAmount: JSON.stringify([
                    { dishId: 1, dishName: 'Pancakes', dishPrice: 5, amount: 2 },
                    { dishId: 2, dishName: 'Caesar Salad', dishPrice: 8, amount: 1 }
                ]),
                total: 18
            },
            {
                invoiceId: 2,
                listDishesWithAmount: JSON.stringify([
                    { dishId: 3, dishName: 'Steak', dishPrice: 19, amount: 2 }
                ]),
                total: 38
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('DetailInvoice', null, {});
    }
};