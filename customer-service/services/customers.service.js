const ClientError = require("../errors/client.error");
const ServerError = require("../errors/server.error");
const CustomersModel = require("../config/models/customers.model");

class CustomerService {
    static async addCustomer(userInput) {
        const { first_name, last_name, email, phone_number, street, city, state, zip_code, country } = userInput;

        const newCustomer = await CustomersModel.create({
            first_name,
            last_name,
            email,
            phone_number,
            street,
            city,
            state,
            zip_code,
            country
        });

        return {
            message: 'Customer added successfully',
            customer: newCustomer.toJSON
        }
    }

    static async getCustomers() {
        throw new ServerError('No customer found');
        return []
    }
}

module.exports = CustomerService;

