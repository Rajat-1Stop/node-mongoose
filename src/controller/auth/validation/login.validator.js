const Joi = require('joi');
const { ApiError } = require('../../../handler/error');

const loginValidator = (req, res, next) => {
    // Joi validation
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string.',
                'string.empty': 'Email cannot be empty.',
                'string.email': 'Email must be a valid email.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string()
            .required()
            .messages({
                'string.base': 'Password must be a string.',
                'string.empty': 'Password cannot be empty.',
                'any.required': 'Password is required.',
            }),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        next(ApiError.badRequest(error.message));
        return;
    }
    next();
}

module.exports = {loginValidator};