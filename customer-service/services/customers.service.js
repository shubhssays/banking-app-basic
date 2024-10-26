const ClientError = require("../errors/client.error");
const ServerError = require("../errors/server.error");
const CustomersModel = require("../config/models/customers.model");
const { Op } = require('sequelize');
const GeneralError = require("../errors/general.error");

class CustomerService {
    static async addCustomer(userInput) {
        const { first_name, last_name, email, phone_number, street, city, state, zip_code, country } = userInput;
        // Check for duplicate entry based on email and phone number
        const existingCustomer = await CustomersModel.findOne({
            attributes: ['customer_id'],
            where: {
                [Op.or]: [
                    { email },
                    { phone_number }
                ]
            },
        });

        if (existingCustomer) {
            throw new ClientError('Customer with this email and phone number already exists');
        }

        // Create new customer
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

    static async getCustomers(userInput) {
        const { page = 1, limit = 10 } = userInput;
        const offset = (Number(page) - 1) * Number(limit);

        const customers = await CustomersModel.findAndCountAll({
            limit,
            offset,
        });

        if (customers.count == 0) {
            throw new GeneralError('No customer found', 200);
        }

        return {
            message: 'Customers fetched successfully',
            totalItems: customers.count,
            totalPages: Math.ceil(customers.count / limit),
            currentPage: Number(page),
            customers: customers.rows
        };
    }
}

module.exports = CustomerService;

