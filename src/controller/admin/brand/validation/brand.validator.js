const Joi = require('joi');
const { ApiError } = require('../../../../handler');
const { 
    PEOPLE_VALIDATION_RULES 
} = require('../../../../utils');

const { nameRule } = PEOPLE_VALIDATION_RULES;


const brandValidator = (req, res, next) => {
    // Joi validation
    const schema = Joi.object({
        _id: Joi.string()
            .allow(null)
            .messages({
                'string.base': 'Id must be a string.',
            }),
        name: Joi.string()
            .min(nameRule.min.value)
            .max(nameRule.max.value)
            .required()
            .messages({
                'string.base': 'Brand name must be a string.',
                'string.empty': 'Brand name cannot be empty.',
                'any.required': 'Brand name is required.',
                'string.min': `Brand name ${nameRule.min.message}`,
                'string.max': `Brand name ${nameRule.max.message}`,
            }),
        image: Joi.string()
            .allow(null)
            .messages({
                'string.base': 'Image must be a string.',
            }),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        next(ApiError.badRequest(error.message));
        return;
    }
    next();
}

module.exports = {brandValidator};