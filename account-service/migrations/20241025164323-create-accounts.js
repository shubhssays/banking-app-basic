'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('accounts', {
      account_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Use Sequelize's UUIDV4 generator for SQLite compatibility
        primaryKey: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'USD',
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Use Sequelize.NOW for default timestamp
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Use Sequelize.NOW for default timestamp
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};