const { z } = require("zod");

const createCustomerSchema = z.object({
    first_name: z.string({
        required_error: "first_name is required",
        invalid_type_error: "first_name must be a string",
        length_error: "first_name must be between 3 and 255 characters long"
    }).min(3, { message: "first_name must be at least 3 characters long" })
        .max(255, { message: "first_name must be at most 255 characters long" }),
    last_name: z.string({
        required_error: "last_name is required",
        invalid_type_error: "last_name must be a string",
        length_error: "last_name must be between 3 and 255 characters long"
    }).min(3, { message: "last_name must be at least 3 characters long" })
        .max(255, { message: "last_name must be at most 255 characters long" }),
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a valid email address"
    }).email(),
    phone_number: z.string({
        required_error: "phone_number is required",
        invalid_type_error: "phone_number must be a string",
        length_error: "phone_number must be between 10 and 15 characters long"
    }).min(10, { message: "phone_number must be at least 10 characters long" })
        .max(15, { message: "phone_number must be at most 15 characters long" }),
    street: z.string({
        required_error: "street is required",
        invalid_type_error: "street must be a string",
        length_error: "street must be between 3 and 255 characters long"
    }).min(3, { message: "street must be at least 3 characters long" })
        .max(255, { message: "street must be at most 255 characters long" }),
    city: z.string({
        required_error: "city is required",
        invalid_type_error: "city must be a string",
        length_error: "city must be between 3 and 255 characters long"
    }).min(3, { message: "city must be at least 3 characters long" })
        .max(255, { message: "city must be at most 255 characters long" }),
    state: z.string({
        required_error: "state is required",
        invalid_type_error: "state must be a string",
        length_error: "state must be between 3 and 255 characters long"
    }).min(3, { message: "state must be at least 3 characters long" })
        .max(255, { message: "state must be at most 255 characters long" }),
    zip_code: z.string({
        required_error: "zip_code is required",
        invalid_type_error: "zip_code must be a string",
        length_error: "zip_code must be between 3 and 255 characters long"
    }).min(3, { message: "zip_code must be at least 3 characters long" })
        .max(255, { message: "zip_code must be at most 255 characters long" }),
    country: z.string({
        required_error: "country is required",
        invalid_type_error: "country must be a string",
        length_error: "country must be between 3 and 255 characters long"
    }).min(3, { message: "country must be at least 3 characters long" })
        .max(255, { message: "country must be at most 255 characters long" }),
});

const updateCustomerSchema = z.object({
    customer_id: z.string({
        required_error: "customer_id is required",
        invalid_type_error: "customer_id must be a valid UUID",
    }).uuid(),
    first_name: z.string({
        required_error: "first_name is required",
        invalid_type_error: "first_name must be a string",
        length_error: "first_name must be between 3 and 255 characters long"
    }).min(3, { message: "first_name must be at least 3 characters long" })
        .max(255, { message: "first_name must be at most 255 characters long" }).optional(),
    last_name: z.string({
        required_error: "last_name is required",
        invalid_type_error: "last_name must be a string",
        length_error: "last_name must be between 3 and 255 characters long"
    }).min(3, { message: "last_name must be at least 3 characters long" })
        .max(255, { message: "last_name must be at most 255 characters long" }).optional(),
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a valid email address"
    }).email().optional(),
    phone_number: z.string({
        required_error: "phone_number is required",
        invalid_type_error: "phone_number must be a string",
        length_error: "phone_number must be between 10 and 15 characters long"
    }).min(10, { message: "phone_number must be at least 10 characters long" })
        .max(15, { message: "phone_number must be at most 15 characters long" }).optional(),
    street: z.string({
        required_error: "street is required",
        invalid_type_error: "street must be a string",
        length_error: "street must be between 3 and 255 characters long"
    }).min(3, { message: "street must be at least 3 characters long" })
        .max(255, { message: "street must be at most 255 characters long" }).optional(),
    city: z.string({
        required_error: "city is required",
        invalid_type_error: "city must be a string",
        length_error: "city must be between 3 and 255 characters long"
    }).min(3, { message: "city must be at least 3 characters long" })
        .max(255, { message: "city must be at most 255 characters long" }).optional(),
    state: z.string({
        required_error: "state is required",
        invalid_type_error: "state must be a string",
        length_error: "state must be between 3 and 255 characters long"
    }).min(3, { message: "state must be at least 3 characters long" })
        .max(255, { message: "state must be at most 255 characters long" }).optional(),
    zip_code: z.string({
        required_error: "zip_code is required",
        invalid_type_error: "zip_code must be a string",
        length_error: "zip_code must be between 3 and 255 characters long"
    }).min(3, { message: "zip_code must be at least 3 characters long" })
        .max(255, { message: "zip_code must be at most 255 characters long" }).optional(),
    country: z.string({
        required_error: "country is required",
        invalid_type_error: "country must be a string",
        length_error: "country must be between 3 and 255 characters long"
    }).min(3, { message: "country must be at least 3 characters long" })
        .max(255, { message: "country must be at most 255 characters long" }).optional(),
});

const getCustomerDetailsSchema = z.object({
    customer_id: z.string({
        required_error: "customer_id is required",
        invalid_type_error: "customer_id must be a valid UUID",
    }).uuid(),
});

const deleteCustomerSchema = z.object({
    customer_id: z.string({
        required_error: "customer_id is required",
        invalid_type_error: "customer_id must be a valid UUID",
    }).uuid(),
});

const getCustomersSchema = z.object({
    page: z.string({
        required_error: "page is required",
        invalid_type_error: "page must be a positive number with a minimum value of 1",
    }).transform((val) => {
        const parsed = parseInt(val, 10);
        if (isNaN(parsed) || parsed < 1) {
            throw new Error("page must be a positive number with a minimum value of 1");
        }
        return parsed;
    }).optional(),

    limit: z.string({
        required_error: "limit is required",
        invalid_type_error: "limit must be a positive number between 1 and 20",
    }).transform((val) => {
        const parsed = parseInt(val, 10);
        if (isNaN(parsed) || parsed < 1 || parsed > 20) {
            throw new Error("limit must be a positive number between 1 and 20");
        }
        return parsed;
    }).optional()
});

module.exports = {
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerDetailsSchema,
    deleteCustomerSchema,
    getCustomersSchema,
}