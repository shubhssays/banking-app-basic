// models/customer.js

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Customer extends Model {
        static associate(models) {
            // define association here if needed
            // e.g., Customer.hasMany(models.Account, { foreignKey: 'customer_id' });
        }
    }

    Customer.init({
        customer_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.literal('gen_random_uuid()')
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        zip_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        timestamps: false, // disable Sequelize's automatic timestamps
        underscored: true // keep snake_case for column names
    });

    return Customer;
};
