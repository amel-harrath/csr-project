module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requirement_document_type', {
      requirement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'requirements',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      document_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'document_types',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint('requirement_document_type', {
      fields: ['requirement_id', 'document_type_id'],
      type: 'unique',
      name: 'unique_requirement_document_type',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('requirement_document_type');
  },
};
