'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Menu', [
      {
        menuName: 'Today Menu',
        listDishes: JSON.stringify([
          { dishId: 1 },
          { dishId: 2 },
          { dishId: 3 }
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Menu', null, {});
  }
};