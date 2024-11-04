'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      
      // Create customers table
      await queryInterface.createTable('customers', {
        customer_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4  // Use Sequelize's UUIDV4 generator
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
          defaultValue: Sequelize.NOW  // Use Sequelize.NOW for current timestamp
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW  // Use Sequelize.NOW for current timestamp
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
