'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Enable pgcrypto extension for UUID generation
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
      
      // Create customers table
      await queryInterface.createTable('customers', {
        customer_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        first_name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false
        },
        phone_number: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false
        },
        street: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        city: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        state: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        zip_code: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        country: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
      
      console.log('Table creation completed');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('customers');
    } catch (error) {
      console.error('Migration rollback failed:', error);
      throw error;
    }
  }
};