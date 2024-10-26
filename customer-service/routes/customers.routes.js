const express = require('express')
const router = express.Router();
const CustomerController = require('../controllers/customers.controller');
const routeHandler = require('../handlers/route.handler');

router.post('/', routeHandler(CustomerController.addCustomerHandler));
router.get('/', routeHandler(CustomerController.getCustomerHandler));
router.put('/', routeHandler(CustomerController.updateCustomerHandler));

module.exports = router;