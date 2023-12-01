const { ApiError } = require('../handler');

// Create auth middleware to check token from client
const role = (role) => {
    return (req, res, next) => {
        if(!req.user || req.user.role !== role) {
            return next(ApiError.forbidden('Access Forbidden: This resource is not available for your account.'))
        }
        next();
    };
};

module.exports = {role};