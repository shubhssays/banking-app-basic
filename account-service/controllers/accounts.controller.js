const AccountService = require("../services/accounts.service");
const RequestHandler = require("../handlers/request.handler");

class AccountController {
    static async addMoneyHandler(request, reply) {
        const validData = request.userInput;
        const data = await AccountService.addMoney(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async deductMoneyHandler(request, reply) {
        const validData = request.userInput;
        const data = await AccountService.deductMoney(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async getAccountDetailsHandler(request, reply) {
        const validData = request.userInput;
        const data = await AccountService.getAccountDetails(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async deleteAccountHandler(request, reply) {
        const validData = request.userInput;
        const data = await AccountService.deleteAccount(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async createAccountHandler(request, reply) {
        const validData = request.userInput;
        const data = await AccountService.createAccount(validData);
        return RequestHandler.successHandler(request, reply, data);
    }
}

module.exports = AccountController;