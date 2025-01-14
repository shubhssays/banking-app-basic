const ClientError = require("../errors/client.error");
const ServerError = require("../errors/server.error");
const CustomersModel = require("../config/models/customers.model");
const { Op } = require('sequelize');
const GeneralError = require("../errors/general.error");
const { getServiceUrl } = require('../eurekaHelper');
const Axios = require('../utils/axios');
const config = require('config');

class CustomerService {
    static async addCustomer(userInput) {
        const { first_name, last_name, email, phone_number, street, city, state, zip_code, country } = userInput;

        const transaction = await CustomersModel.sequelize.transaction();

        try {
            // Check for duplicate entry based on email and phone number
            const existingCustomer = await CustomersModel.findOne({
                attributes: ['customer_id'],
                where: {
                    [Op.or]: [
                        { email },
                        { phone_number }
                    ]
                },
                transaction
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
            }, { transaction });

            const accountServiceURL = await getServiceUrl(config.get("appIdAccountService"));

            let accountResponse;

            try {
                const axios = new Axios(accountServiceURL);
                accountResponse = await axios.post('/', {
                    customer_id: newCustomer.customer_id
                });
            } catch (error) {
                console.log('Error in creating account', error);
                throw new ServerError('Error in creating account');
            }

            if (accountResponse.status != 'success') {
                throw new ServerError('Error in creating account');
            }

            await transaction.commit();

            return {
                message: 'Customer added successfully',
                customer: {
                    customer_id: newCustomer.customer_id,
                },
                account: accountResponse.data.account
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async getCustomers(userInput) {
        const { page = 1, limit = 10 } = userInput;
        const offset = (Number(page) - 1) * Number(limit);

        const customers = await CustomersModel.findAndCountAll({
            limit,
            offset,
            order: [['created_at', 'DESC']]
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

    static async updateCustomer(userInput) {
        const { customer_id, first_name, last_name, email, phone_number, street, city, state, zip_code, country } = userInput;

        // Check if customer exists
        const customer = await CustomersModel.findOne({
            where: { customer_id },
            attributes: ['customer_id']
        });

        if (!customer) {
            throw new ClientError('Customer not found');
        }

        const condition = [];
        if (email) condition.push({ email })
        if (phone_number) condition.push({ phone_number })

        if (condition.length > 0) {
            // Check for duplicate entry based on email and phone number
            const existingCustomer = await CustomersModel.findOne({
                attributes: ['customer_id'],
                where: {
                    [Op.or]: condition,
                    customer_id: { [Op.ne]: customer_id }
                },
            });

            if (existingCustomer) {
                throw new ClientError('Another customer with this email or phone number already exists');
            }
        }

        // Update customer details
        const updateData = {};
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (email) updateData.email = email;
        if (phone_number) updateData.phone_number = phone_number;
        if (street) updateData.street = street;
        if (city) updateData.city = city;
        if (state) updateData.state = state;
        if (zip_code) updateData.zip_code = zip_code;
        if (country) updateData.country = country;

        if (Object.keys(updateData).length == 0) {
            throw new ClientError('No data to update');
        }

        await customer.update(updateData);

        return {
            message: 'Customer updated successfully',
        };
    }

    static async getCustomerDetails(userInput) {
        const { customer_id } = userInput
        // Check if customer exists
        const customer = await CustomersModel.findOne({
            where: { customer_id },
        });

        if (!customer) {
            throw new ClientError('Customer not found');
        }

        return {
            message: 'Customer details fetched successfully',
            customer: customer.toJSON()
        };
    }

    static async deleteCustomer(userInput) {
        const { customer_id } = userInput;

        // Check if customer exists
        const customer = await CustomersModel.findOne({
            where: { customer_id },
            attributes: ['customer_id']
        });

        if (!customer) {
            throw new ClientError('Customer not found');
        }

        const accountServiceURL = await getServiceUrl(config.get("appIdAccountService"));

        let accountResponse;

        try {
            const axios = new Axios(accountServiceURL);
            accountResponse = await axios.delete(`/${customer_id}`);
        } catch (error) {
            console.log('Error in deleting account', error);
            throw new ServerError('Error in deleting account');
        }

        if (accountResponse.status != 'success') {
            throw new ServerError('Error in deleting account');
        }

        await customer.destroy();

        return {
            message: 'Customer deleted successfully',
        };
    }
}

module.exports = CustomerService;

