const Joi = require('joi');
const { ApiError } = require('../../../../handler');


const inventoryValidator = (req, res, next) => {
    // Joi validation
    const schema = Joi.object({
        _id: Joi.string()
            .allow(null)
            .messages({
                'string.base': 'Id must be a string.',
            }),
        productId: Joi.string()
            .required()
            .messages({
                'string.base': 'Product ID must be a string.',
                'any.required': 'Product ID is required.',
            }),
        size: Joi.string()
            .required()
            .messages({
                'string.base': 'Size must be a string.',
                'string.empty': 'Size cannot be empty.',
                'any.required': 'Size is required.',
            }),
        color: Joi.string()
            .required()
            .messages({
                'string.base': 'Color must be a string.',
                'string.empty': 'Color cannot be empty.',
                'any.required': 'Color is required.',
            }),
        total_quantity: Joi.number()
            .required() 
            .messages({
                'number.base': 'Total Quantity must be a number.',
                'any.required': 'Total Quantity is required.',
            }),
        availabel_quantity: Joi.number()
            .required() 
            .messages({
                'number.base': 'Available Quantity must be a number.',
                'any.required': 'Available Quantity is required.',
            }),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        next(ApiError.badRequest(error.message));
        return;
    }
    next();
}

module.exports = {inventoryValidator};