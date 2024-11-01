'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
      {
        userName: 'test1',
        userAddress: 'tphcm',
        userGender: true,
        userEmail: 'test@.com',
        password: '123',
        role: 'admin',
      },
      {
        userName: 'test2',
        userAddress: 'hn',
        userGender: false,
        userEmail: 'test2@.com',
        password: '1234',
        role: 'admin',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};