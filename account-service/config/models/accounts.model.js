const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust path as needed

const Account = sequelize.define('Account', {
    account_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'USD'
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
    tableName: 'accounts',
    timestamps: false
});

module.exports = Account;