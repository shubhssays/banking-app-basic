const express = require('express')
const router = express.Router();
const CustomerController = require('../controllers/customers.controller');
const routeHandler = require('../handlers/route.handler');
const schemaValidator = require('../middlewares/schemaValidators');
const { createCustomerSchema, updateCustomerSchema, getCustomerDetailsSchema, deleteCustomerSchema, getCustomersSchema } = require('../schemas/customers.schemas');

router.post('/', schemaValidator(createCustomerSchema), routeHandler(CustomerController.addCustomerHandler));
router.get('/', schemaValidator(getCustomersSchema), routeHandler(CustomerController.getCustomerHandler));
router.put('/', schemaValidator(updateCustomerSchema), routeHandler(CustomerController.updateCustomerHandler));
router.get('/:customer_id', schemaValidator(getCustomerDetailsSchema), routeHandler(CustomerController.getCustomerDetailsHandler));
router.delete('/:customer_id', schemaValidator(deleteCustomerSchema), routeHandler(CustomerController.deleteCustomerHandler));

module.exports = router;