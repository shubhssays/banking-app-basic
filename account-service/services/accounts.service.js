const ClientError = require("../errors/client.error");
const AccountsModel = require("../config/models/accounts.model");

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
            where: { account_id },
            attributes: ['account_id']
        });

        if (!account) {
            throw new ClientError('Account not found');
        }

        // Delete account
        await AccountsModel.destroy({
            where: { account_id }
        });

        return {
            message: 'Account deleted successfully'
        };
    }
}

module.exports = AccountService;