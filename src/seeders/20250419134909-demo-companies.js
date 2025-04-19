'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [companies] = await queryInterface.sequelize.query(
      `SELECT id FROM "companies" WHERE name = 'GreenTech corp'`
    );
    if (companies.length === 0) {
      await queryInterface.bulkInsert('companies', [
        {
          name: 'GreenTech corp',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('companies', null, {});
  },
};
