const Joi = require('joi');
const { ApiError } = require('../../../handler/error');
const { 
    PATTERN, 
    PEOPLE_VALIDATION_RULES 
} = require('../../../utils/validation');

const { passwordRegex } = PATTERN;
const { nameRule } = PEOPLE_VALIDATION_RULES;


const registerValidator = (req, res, next) => {
    // Joi validation
    const schema = Joi.object({
        firstName: Joi.string()
            .min(nameRule.min.value)
            .max(nameRule.max.value)
            .required()
            .messages({
                'string.base': 'First name must be a string.',
                'string.empty': 'First name cannot be empty.',
                'any.required': 'First name is required.',
                'string.min': `First name ${nameRule.min.message}`,
                'string.max': `First name ${nameRule.max.message}`,
            }),
        lastName: Joi.string()
            .min(nameRule.min.value)
            .max(nameRule.max.value)
            .required()
            .messages({
                'string.base': 'Last name must be a string.',
                'string.empty': 'Last name cannot be empty.',
                'any.required': 'Last name is required.',
                'string.min': `Last name ${nameRule.min.message}`,
                'string.max': `Last name ${nameRule.max.message}`,
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string.',
                'string.empty': 'Email cannot be empty.',
                'string.email': 'Email must be a valid email.',
                'any.required': 'Email is required.',
            }),
        gender: Joi.string()
            .valid('male', 'female', 'unisex')
            .required()
            .messages({
                'string.base': 'Gender must be a string.',
                'string.empty': 'Gender cannot be empty.',
                'any.required': 'Gender is required.',
                'any.only': 'Gender must be one of: male, female, unisex'
            }),
        password: Joi.string()
            .required()
            .regex(passwordRegex.value)
            .messages({
                'string.base': 'Password must be a string.',
                'string.empty': 'Password cannot be empty.',
                'any.required': 'Password is required.',
                'string.pattern.base': `Password ${passwordRegex.message}`,
            }),
        confirmPassword: Joi.string()
            .required()
            .valid(Joi.ref('password'))
            .messages({
                'string.base': 'Confirm Password must be a string.',
                'string.empty': 'Confirm Password cannot be empty.',
                'any.required': 'Confirm Password is required.',
                'any.only': 'Confirm Password must match Password.',
            }),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        next(ApiError.badRequest(error.message));
        return;
    }
    next();
}

module.exports = {registerValidator};