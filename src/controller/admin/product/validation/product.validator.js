const Joi = require('joi');
const { ApiError } = require('../../../../handler');
const { 
    PEOPLE_VALIDATION_RULES 
} = require('../../../../utils');

const { nameRule } = PEOPLE_VALIDATION_RULES;


const productValidator = (req, res, next) => {
    // Joi validation
    const schema = Joi.object({
        _id: Joi.string()
            .allow(null)
            .messages({
                'string.base': 'Id must be a string.',
            }),
        brandId: Joi.string()
            .required()
            .messages({
                'string.base': 'Brand ID must be a string.',
                'any.required': 'Brand ID is required.',
            }),
        name: Joi.string()
            .min(nameRule.min.value)
            .max(nameRule.max.value)
            .required()
            .messages({
                'string.base': 'Product name must be a string.',
                'string.empty': 'Product name cannot be empty.',
                'any.required': 'Product name is required.',
                'string.min': `Product name ${nameRule.min.message}`,
                'string.max': `Product name ${nameRule.max.message}`,
            }),
        price: Joi.number()
            .precision(2)
            .required()
            .messages({
                'number.base': 'Price must be a number.',
                'number.precision': 'Price must have a maximum of 2 decimal places.',
                'any.required': 'Price is required.',
            }),
        description: Joi.string()
            .allow(null)
            .messages({
                'string.base': 'Description must be a string.',
            }),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        next(ApiError.badRequest(error.message));
        return;
    }
    next();
}

module.exports = {productValidator};