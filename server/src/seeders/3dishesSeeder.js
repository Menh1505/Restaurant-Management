'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Dish', [
            {
                dishName: 'Pancakes',
                dishPrice: 5,
                dishImage: 'pancakes.jpg',
                dishDetail: 'Fluffy pancakes with maple syrup'
            },
            {
                dishName: 'Caesar Salad',
                dishPrice: 8,
                dishImage: 'caesar_salad.jpg',
                dishDetail: 'Fresh romaine lettuce with Caesar dressing'
            },
            {
                dishName: 'Steak',
                dishPrice: 19,
                dishImage: 'steak.jpg',
                dishDetail: 'Grilled ribeye steak with vegetables'
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Dish', null, {});
    }
};