const CustomerService = require("../services/customers.service");
const RequestHandler = require("../handlers/request.handler");

class CustomerController {
    static async addCustomerHandler(request, reply) {
        const validData = request.userInput;
        const data = await CustomerService.addCustomer(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async getCustomerHandler(request, reply) {
        const validData = request.userInput;
        const data = await CustomerService.getCustomers(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async updateCustomerHandler(request, reply) {
        const validData = request.userInput;
        const data = await CustomerService.updateCustomer(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async getCustomerDetailsHandler(request, reply) {
        const validData = request.userInput;
        const data = await CustomerService.getCustomerDetails(validData);
        return RequestHandler.successHandler(request, reply, data);
    }

    static async deleteCustomerHandler(request, reply) {
        const validData = request.userInput;
        const data = await CustomerService.deleteCustomer(validData);
        return RequestHandler.successHandler(request, reply, data);
    }
}

module.exports = CustomerController;