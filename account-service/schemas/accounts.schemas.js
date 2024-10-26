const { z } = require("zod");

const addMoneySchema = z.object({
    account_id: z.string({
        required_error: "account_id is required",
        invalid_type_error: "account_id must be a valid UUID",
    }).uuid(),
    amount: z.number({
        required_error: "amount is required",
        invalid_type_error: "amount must be a number",
        non_zero_error: "amount must be a positive number"
    }).positive().optional(),
});

const deductMoneySchema = z.object({
    account_id: z.string({
        required_error: "account_id is required",
        invalid_type_error: "account_id must be a valid UUID",
    }).uuid(),
    amount: z.number({
        required_error: "amount is required",
        invalid_type_error: "amount must be a number",
        non_zero_error: "amount must be a positive number"
    }).positive().optional(),
});

const getAccountDetailsSchema = z.object({
    account_id: z.string({
        required_error: "account_id is required",
        invalid_type_error: "account_id must be a valid UUID",
    }).uuid(),
});

const deleteAccountSchema = z.object({
    account_id: z.string({
        required_error: "account_id is required",
        invalid_type_error: "account_id must be a valid UUID",
    }).uuid(),
});

module.exports = {
    addMoneySchema,
    deductMoneySchema,
    getAccountDetailsSchema,
    deleteAccountSchema
}