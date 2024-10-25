const ClientError = require("../errors/client.error");
const ServerError = require("../errors/server.error");

class CustomerService {
    static addCustomer(customer) {
        return {
            message: 'Customer added successfully',
        }
    }

    static getCustomers() {
        throw new ServerError('No customer found');
        return []
    }
}

module.exports = CustomerService;

