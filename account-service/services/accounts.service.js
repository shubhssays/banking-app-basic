const ClientError = require("../errors/client.error");
const AccountsModel = require("../config/models/accounts.model");
const { Op } = require('sequelize');

class AccountService {
    static async addMoney(userInput) {
        const { account_id, amount } = userInput;

        // Check if account exists
        const account = await AccountsModel.findOne({
            where: { account_id },
            attributes: ['account_id', 'balance']
        });

        if (!account) {
            throw new ClientError('Account not found');
        }

        // Add money to account
        await AccountsModel.update({
            balance: account.balance + amount
        }, {
            where: { account_id }
        });

        return {
            message: 'Money added successfully'
        }
    }

    static async deductMoney(userInput) {
        const { account_id, amount } = userInput;

        // Check if account exists
        const account = await AccountsModel.findOne({
            where: { account_id },
            attributes: ['account_id', 'balance']
        });

        if (!account) {
            throw new ClientError('Account not found');
        }

        // Check if account has enough balance

        if (account.balance < amount) {
            throw new ClientError('Insufficient balance');
        }

        // Deduct money from account

        await AccountsModel.update({
            balance: account.balance - amount
        }, {
            where: { account_id }
        });

        return {
            message: 'Money deducted successfully'
        }
    }

    static async getAccountDetails(userInput) {
        const { account_id } = userInput;

        // Check if account exists
        const account = await AccountsModel.findOne({
            where: { account_id },
            attributes: ['account_id', 'balance', 'customer_id']
        });

        if (!account) {
            throw new ClientError('Account not found');
        }

        return {
            message: 'Account details fetched successfully',
            account
        };
    }

    static async deleteAccount(userInput) {
        const { account_id } = userInput;

        // Check if account exists  
        const account = await AccountsModel.findOne({
            where: {
                [Op.or]: [
                    { account_id },
                    { customer_id: account_id }
                ]
            },
            attributes: ['account_id']
        });

        if (!account) {
            throw new ClientError('Account not found');
        }

        // Delete account
        const delResp = await AccountsModel.destroy({
            where: { account_id: account.account_id }
        });

        console.log('delResp', delResp);

        return {
            message: 'Account deleted successfully'
        };
    }

    static async createAccount(userInput) {
        const { customer_id, initial_balance = 0.00 } = userInput;

        // Check if account already exists
        const existingAccount = await AccountsModel.findOne({
            where: { customer_id },
            attributes: ['customer_id']
        });

        if (existingAccount) {
            throw new ClientError('Account already exists');
        }

        // Create new account
        const account = await AccountsModel.create({
            customer_id,
            balance: initial_balance
        });

        return {
            account: {
                account_id: account.account_id,
                balance: account.balance,
            },
            message: 'Account created successfully'
        };
    }
}

module.exports = AccountService;