class CustomerService {
    static addCustomer(customer) {
        return {
            message: 'Customer added successfully',
        }
    }

    static getCustomers() {
        return []
    }
}

module.exports = CustomerService;

