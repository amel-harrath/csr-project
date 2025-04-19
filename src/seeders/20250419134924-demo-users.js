'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "users" WHERE email = 'csr.manager@greentech.com'`
    );

    if (users.length === 0) {
      const passwordHash = await bcrypt.hash('password123', 10);

      const [companies] = await queryInterface.sequelize.query(
        `SELECT id FROM "companies" WHERE name = 'GreenTech Corp'`
      );

      const companyId = companies[0]?.id;

      if (companyId) {
        await queryInterface.bulkInsert('users', [
          {
            email: 'csr.manager@greentech.com',
            password_hash: passwordHash,
            company_id: companyId,
            role: 'csr-manager',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'csr.manager@greentech.com',
    });
  },
};
