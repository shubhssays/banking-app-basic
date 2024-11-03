const express = require('express')
const router = express.Router();
const AccountController = require('../controllers/accounts.controller');
const routeHandler = require('../handlers/route.handler');
const schemaValidator = require('../middlewares/schemaValidators');
const { addMoneySchema, deductMoneySchema, getAccountDetailsSchema, deleteAccountSchema} = require('../schemas/accounts.schemas');

router.put('/add-money', schemaValidator(addMoneySchema), routeHandler(AccountController.addMoneyHandler));
router.put('/deduct-money', schemaValidator(deductMoneySchema), routeHandler(AccountController.deductMoneyHandler));
router.get('/:account_id', schemaValidator(getAccountDetailsSchema), routeHandler(AccountController.getAccountDetailsHandler));
router.delete('/:account_id', schemaValidator(deleteAccountSchema), routeHandler(AccountController.deleteAccountHandler));
router.post('/', routeHandler(AccountController.createAccountHandler));

module.exports = router;